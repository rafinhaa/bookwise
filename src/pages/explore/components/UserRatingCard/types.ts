import { Rating, User } from "@prisma/client";

export type RatingWithAuthor = Rating & {
  user: User;
};

export type UserRatingCardProps = {
  rating: RatingWithAuthor;
};
