import { useCallback, useState } from "react";
import { Star } from "phosphor-react";

import { RatingStarsContainer } from "./styles";

import { RatingStarsProps } from "./types";

export const RatingStars = ({
  rating,
  size = "sm",
  setRating,
  ...props
}: RatingStarsProps) => {
  const [previewValue, setPreviewValue] = useState(0);
  const isEditable = !!setRating;

  const ratingValue = isEditable ? previewValue : rating;

  const handleRatingChange = useCallback(
    (value: number) => {
      if (isEditable) {
        setPreviewValue(value);
        setRating(value);
      }
    },
    [isEditable, setPreviewValue, setRating]
  );

  return (
    <RatingStarsContainer
      css={isEditable ? { cursor: "pointer" } : undefined}
      size={size}
      {...props}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          weight={index + 1 <= ratingValue ? "fill" : "regular"}
          onMouseEnter={() => handleRatingChange(index + 1)}
          onMouseLeave={() => handleRatingChange(rating)}
          onClick={() => handleRatingChange(index + 1)}
        />
      ))}
    </RatingStarsContainer>
  );
};
