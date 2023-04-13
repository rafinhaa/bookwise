import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

import { buildNextAuthOptions } from "../auth/[...nextauth].api";

import { BookWithAvgRatingApi } from "@/components/BookCard/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const categoryIdParam = req.query.category;
  const categoryId =
    categoryIdParam === "null" ||
    categoryIdParam === undefined ||
    categoryIdParam.length === 0
      ? null
      : categoryIdParam;

  const nameParam = req.query.name;
  const name =
    nameParam === "null" || nameParam === undefined || nameParam.length === 0
      ? null
      : `%${nameParam}%`;

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  const userId = session?.user.id || null;

  const books: BookWithAvgRatingApi[] = await prisma.$queryRaw`
    SELECT 
      b.*, c.name as category_name, 
      AVG(r.rate) as avgRating,
      CAST(COUNT(DISTINCT r.user_id) as VARCHAR) as ratings,
      CAST(EXISTS (SELECT 1 FROM Ratings r2 WHERE r2.book_id = b.id AND r2.user_id = ${userId}) as VARCHAR) as alreadyRead
    FROM books b
    JOIN CategoriesOnBooks cb ON cb.book_id = b.id
    JOIN categories c ON c.id = cb.categoryId
    INNER JOIN Ratings r ON r.book_id = b.id
    WHERE cb.categoryId = IFNULL(${categoryId}, cb.categoryId)
      AND b.name LIKE IFNULL(${name}, b.name)
    GROUP BY b.id
    ORDER BY avgRating DESC
`;

  const parsedBooks = books.map((book) => ({
    ...book,
    ratings: Number(book.ratings),
    alreadyRead: book.alreadyRead === "1" ? true : false,
  }));

  res.status(200).json({ books: parsedBooks });
};

export default handler;
