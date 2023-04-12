import { ComponentProps } from "react";
import { RatingStarsContainer } from "./styles";

export type RatingStarsProps = ComponentProps<typeof RatingStarsContainer> & {
  rating: number;
  setRating?: (rating: number) => void;
};
