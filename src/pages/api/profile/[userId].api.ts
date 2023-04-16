import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { ProfileInfo, ProfileUser } from "@/pages/profile/types";
import { userIdSchema } from "../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { userId } = userIdSchema.parse(req.query);
    const [user]: ProfileUser[] = await prisma.$queryRaw`
      SELECT
        u.*
      FROM users u
      WHERE u.id = ${userId}
    `;

    const ratings = await prisma.$queryRaw`
      SELECT
        r.id,
        r.created_at,
        b.cover_url,
        b.id as bookId,
        b.name,
        b.author,
        r.rate,
        r.description
      FROM ratings r
      INNER JOIN books b ON b.id = r.book_id
      WHERE r.user_id = ${userId}
      ORDER BY r.created_at DESC
    `;

    const [info]: ProfileInfo[] = await prisma.$queryRaw`
      SELECT
        CAST(SUM(b.total_pages) AS VARCHAR) as readPages,
        CAST(COUNT(DISTINCT b.id) AS VARCHAR) AS ratedBooks,
        CAST(COUNT(DISTINCT b.author) AS VARCHAR) AS readAuthors,
        ( 
          SELECT c.name 
          FROM CategoriesOnBooks cob 
          INNER JOIN categories c ON c.id = cob.categoryId 
          WHERE cob.book_id IN (
            SELECT book_id FROM ratings WHERE user_id = ${userId}
          )
          GROUP BY cob.categoryId 
          ORDER BY COUNT(*) DESC 
          LIMIT 1
        ) AS mostReadCategory
      FROM ratings r
      INNER JOIN books b ON b.id = r.book_id
      WHERE r.user_id = ${userId}
    `;

    const profileData = {
      user,
      ratings,
      info,
    };

    return res.json({ profile: profileData });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
