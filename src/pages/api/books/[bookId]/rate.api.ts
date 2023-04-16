import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../auth/[...nextauth].api";
import { bookIdSchema, rateBodySchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) return res.status(401).end();

  try {
    const userId = String(session?.user?.id!);

    const { bookId } = bookIdSchema.parse(req.query);
    const { description, rate } = rateBodySchema.parse(req.body);

    const userAlreadyRated = await prisma.rating.findFirst({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    if (userAlreadyRated) {
      return res.status(400).json({
        error: "You already rated this book",
      });
    }

    const bookRating = await prisma.rating.create({
      data: {
        book_id: bookId,
        description,
        rate,
        user_id: userId,
      },
    });

    if (!bookRating) throw new Error();

    return res.status(201).end();
  } catch (error) {
    return res.status(400).end();
  }
}
