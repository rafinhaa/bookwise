import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

import { buildNextAuthOptions } from "../auth/[...nextauth].api";

import { BookWithAvgRatingApi } from "@/components/BookCard/types";
import { booksExploreSchema } from "../schemas";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { category: categoryId, name } = booksExploreSchema.parse(req.query);

    const session = await getServerSession(
      req,
      res,
      buildNextAuthOptions(req, res)
    );

    const userId = session?.user.id || null;

    const books: BookWithAvgRatingApi[] = await prisma.$queryRaw`
      SELECT 
        b.*, array_agg(c.name) as category_name, 
        AVG(r.rate) as avg_rating,
        CAST(COUNT(DISTINCT r.user_id) as VARCHAR) as ratings,
        CAST(EXISTS (SELECT 1 FROM Ratings r2 WHERE r2.book_id = b.id AND r2.user_id = ${userId}) as VARCHAR) as alreadyRead
      FROM books b
      JOIN "CategoriesOnBooks" cob ON cob.book_id = b.id
      JOIN categories c ON c.id = cob."categoryId"
      INNER JOIN Ratings r ON r.book_id = b.id
      WHERE cob."categoryId" = COALESCE(${categoryId}, cob."categoryId")
        AND b.name LIKE COALESCE(${name}, b.name)
      GROUP BY b.id
      ORDER BY avg_rating DESC
    `;

    const parsedBooks = books.map((book) => ({
      ...book,
      ratings: Number(book.ratings),
      avgRating: book.avg_rating,
      alreadyRead: book.alreadyRead === "1" ? true : false,
    }));

    res.status(200).json({ books: parsedBooks });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
