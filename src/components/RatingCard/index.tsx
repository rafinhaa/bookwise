import Link from "next/link";
import { useToggleText } from "@/hooks/useToggleText";

import { Avatar } from "@/components/Avatar";
import { Typography } from "@/components/Typography";
import { RatingStars } from "@/components/RatingStars";

import { getTimeDistanceFromNowInTimeZoneBr } from "@/util/getTimeDistanceFromNowInTimeZoneBr";

import {
  BookContent,
  BookDetails,
  BookImage,
  CompactDetails,
  RatingCardContainer,
  ToggleShowMoreButton,
  UserDetails,
} from "./styles";

import { RatingCardProps } from "./types";

const MAX_SUMMARY_LENGTH = 180;

export const RatingCard = ({
  rating,
  variant = "default",
}: RatingCardProps) => {
  const distance = getTimeDistanceFromNowInTimeZoneBr(
    rating.created_at.toString()
  );

  const {
    truncatedText: bookSummary,
    toggleShowMore,
    isShowingMore,
  } = useToggleText(rating.book.summary, MAX_SUMMARY_LENGTH);

  return (
    <RatingCardContainer variant={variant}>
      {variant === "default" && (
        <UserDetails>
          <section>
            <Link href={`/profile/${rating.user_id}`}>
              <Avatar src={rating.user.avatar_url!} alt={rating.user.name} />
            </Link>
            <div>
              <Typography.Text>{rating.user.name}</Typography.Text>
              <Typography.Text size="sm" color="gray-400">
                {distance}
              </Typography.Text>
            </div>
          </section>
          <RatingStars rating={rating.rate} />
        </UserDetails>
      )}
      <BookDetails>
        <Link
          style={{ display: "flex" }}
          href={`/explore?book=${rating.book_id}`}
        >
          <BookImage
            width={108}
            height={152}
            alt="book"
            src={rating.book.cover_url}
          />
        </Link>

        <BookContent>
          <div>
            {variant === "compact" && (
              <CompactDetails>
                <Typography.Text size="sm" color="gray-300">
                  {distance}
                </Typography.Text>

                <RatingStars rating={rating.rate} />
              </CompactDetails>
            )}
            <Typography.Heading size="xs">
              {rating.book.name}
            </Typography.Heading>
            <Typography.Text size="sm" color="gray-400">
              {rating.book.author}
            </Typography.Text>
          </div>

          <Typography.Text
            size="sm"
            color="gray-300"
            css={{
              marginTop: variant === "compact" ? "auto" : "$5",
            }}
          >
            {bookSummary}
            {rating.book.summary.length > MAX_SUMMARY_LENGTH && (
              <ToggleShowMoreButton onClick={toggleShowMore}>
                {isShowingMore ? "ver menos" : "ver mais"}
              </ToggleShowMoreButton>
            )}
          </Typography.Text>
        </BookContent>
      </BookDetails>
    </RatingCardContainer>
  );
};
