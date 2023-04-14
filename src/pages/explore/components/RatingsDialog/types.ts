import { PropsWithChildren } from "react";

import { BookWithAvgRating } from "@/components/BookCard/types";
import { RatingWithAuthor } from "../UserRatingCard/types";
import { CategoriesOnBooks, Category } from "@prisma/client";

export type BookDetails = BookWithAvgRating & {
  ratings: RatingWithAuthor[];
  categories: (CategoriesOnBooks & {
    category: Category;
  })[];
  canRate: boolean;
};

export type RatingsDialogProps = PropsWithChildren & {
  bookId: string;
};
