import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { BookWithAvgRatingApi } from "@/components/BookCard/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const popularBooks: BookWithAvgRatingApi[] = await prisma.$queryRaw`
    SELECT b.*, AVG(r.rate) as avg_rating
    FROM books b
    LEFT JOIN ratings r ON b.id = r.book_id
    GROUP BY b.id
    ORDER BY avg_rating DESC
    LIMIT 4;
  `;

  const popularBooksParsed = popularBooks.map((book) => {
    return { ...book, avgRating: book.avg_rating };
  });

  return res.json({ popularBooks: popularBooksParsed });
};

export default handler;
