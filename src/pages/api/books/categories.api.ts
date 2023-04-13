import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const categories = await prisma.category.findMany();

  return res.json({ categories });
};

export default handler;
