import { Book } from "@prisma/client";

export type BookWithAvgRating = Book & {
  avgRating: number;
  alreadyRead: boolean;
};

export type BookCardProps = {
  book: BookWithAvgRating;
  size?: "md" | "lg";
};
