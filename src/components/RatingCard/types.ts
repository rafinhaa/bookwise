import { Book, Rating, User } from "@prisma/client";

export type RatingWithAuthorAndBook = Rating & {
  user: User;
  book: Book;
};

export type RatingCardProps = {
  rating: RatingWithAuthorAndBook;
  variant?: "default" | "compact";
};
