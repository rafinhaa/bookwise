import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../auth/[...nextauth].api";
import { bookIdSchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { bookId } = bookIdSchema.parse(req.query);

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        ratings: {
          include: {
            user: true,
          },
          orderBy: {
            created_at: "desc",
          },
        },
      },
    });

    if (!book) throw new Error();

    const [bookAvg]: { avgRating: number }[] = await prisma.$queryRaw`
      SELECT
        AVG(r.rate) as avgRating	
      FROM books b
      INNER JOIN Ratings r ON r.book_id = b.id
      WHERE b.id = ${bookId}
    `;

    const session = await getServerSession(
      req,
      res,
      buildNextAuthOptions(req, res)
    );

    const userId = session?.user.id || null;

    const canRate = await (async () => {
      const canRate =
        !!userId &&
        !(await prisma.rating.findFirst({
          where: {
            user_id: String(userId),
            book_id: bookId,
          },
        }));

      return canRate;
    })();

    return res.json({
      book: {
        ...book,
        avgRating: bookAvg.avgRating,
        canRate,
      },
    });
  } catch (error) {
    return res.status(400).end();
  }
}
