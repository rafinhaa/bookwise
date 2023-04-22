import { Book } from "@prisma/client";

export type BookWithAvgRating = Book & {
  avgRating: number | null;
  alreadyRead: boolean;
};

export type BookWithAvgRatingApi = Omit<
  BookWithAvgRating,
  "alreadyRead" | "avgRating" | "alreadyRead"
> & {
  already_read: string;
  avg_rating: number | null;
  ratings: number;
};

export type BookCardProps = {
  book: BookWithAvgRating;
  size?: "md" | "lg";
};
