import { RatingStars } from "../RatingStars";
import { Typography } from "../Typography";

import {
  BookDetails,
  BookImage,
  BookName,
  BookCardContainer,
  ReadBadge,
} from "./styles";

import { BookCardProps } from "./types";

export const BookCard = ({ book, size = "md" }: BookCardProps) => {
  const imageSizeMapping = {
    md: {
      width: 64,
      height: 94,
    },
    lg: {
      width: 108,
      height: 152,
    },
  }[size];

  return (
    <BookCardContainer>
      {book?.alreadyRead && <ReadBadge>LIDO</ReadBadge>}

      <BookImage
        width={imageSizeMapping.width}
        height={imageSizeMapping.height}
        css={{ minWidth: imageSizeMapping.width }}
        alt={book.name}
        src={book.cover_url}
      />
      <BookDetails>
        <div>
          <BookName size="xs">{book.name}</BookName>
          <Typography.Text size="sm" color="gray-400">
            {book.author}
          </Typography.Text>
        </div>

        <RatingStars rating={book.avgRating} />
      </BookDetails>
    </BookCardContainer>
  );
};
