import { Book } from "@prisma/client";

export type BookWithAvgRating = Book & {
  avgRating: number;
  alreadyRead: boolean;
};

export type BookWithAvgRatingApi = Omit<
  BookWithAvgRating,
  "alreadyRead" | "avgRating"
> & {
  alreadyRead: string;
  avg_rating: number;
  ratings: number;
};

export type BookCardProps = {
  book: BookWithAvgRating;
  size?: "md" | "lg";
};
