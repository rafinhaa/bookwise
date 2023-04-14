import { RatingWithAuthor } from "../UserRatingCard/types";

export type BookRatingsProps = {
  ratings: RatingWithAuthor[];
  bookId: string;
  canRate: boolean;
};
