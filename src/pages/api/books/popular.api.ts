import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const popularBooks = await prisma.$queryRaw`
    SELECT b.*, AVG(r.rate) as avgRating
    FROM books b
    LEFT JOIN ratings r ON b.id = r.book_id
    GROUP BY b.id
    ORDER BY avgRating DESC
    LIMIT 4;
  `;
  return res.json({ popularBooks });
};

export default handler;
