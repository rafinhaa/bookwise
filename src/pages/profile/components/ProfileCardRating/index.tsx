import Link from "next/link";

import {
  getDetailedTimeInTimeZoneBr,
  getTimeDistanceFromNowInTimeZoneBr,
} from "@/util/dateAndTimeUtils";

import { RatingStars } from "@/components/RatingStars";
import { Typography } from "@/components/Typography";

import {
  BookDetails,
  BookImage,
  CardContent,
  ProfileCardRatingContainer,
} from "./styles";

import { ProfileCardRatingProps } from "./types";

export const ProfileRatingCard = ({ rating }: ProfileCardRatingProps) => {
  const distance = getTimeDistanceFromNowInTimeZoneBr(
    rating.created_at.toString()
  );

  const detailedHour = getDetailedTimeInTimeZoneBr(
    rating.created_at.toString()
  );

  return (
    <ProfileCardRatingContainer>
      <Typography.Text size="sm" color="gray-300" title={detailedHour}>
        {distance}
      </Typography.Text>

      <CardContent>
        <BookDetails>
          <Link
            style={{ display: "flex" }}
            href={`/explore?book=${rating.bookId}`}
          >
            <BookImage
              src={rating.cover_url}
              alt={rating.name}
              width={98}
              height={134}
            />
          </Link>
          <section>
            <div>
              <Typography.Heading size="sm">{rating.name}</Typography.Heading>
              <Typography.Text size="sm" color="gray-400">
                {rating.author}
              </Typography.Text>
            </div>

            <RatingStars rating={rating.rate} />
          </section>
        </BookDetails>
        <Typography.Text size="sm" color="gray-300">
          {rating.description}
        </Typography.Text>
      </CardContent>
    </ProfileCardRatingContainer>
  );
};
