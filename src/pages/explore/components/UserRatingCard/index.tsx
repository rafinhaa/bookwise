import { useSession } from "next-auth/react";
import Link from "next/link";
import { getTimeDistanceFromNowInTimeZoneBr } from "@/util/getTimeDistanceFromNowInTimeZoneBr";

import { RatingStars } from "@/components/RatingStars";
import { Typography } from "@/components/Typography";
import { Avatar } from "@/components/Avatar";

import { UserRatingCardContainer, UserDetails } from "./styles";

import { UserRatingCardProps } from "./types";

export const UserRatingCard = ({ rating }: UserRatingCardProps) => {
  const { data: session } = useSession();
  const distance = getTimeDistanceFromNowInTimeZoneBr(
    rating.created_at.toString()
  );

  const isOwner = session?.user?.id === rating.user_id;

  return (
    <UserRatingCardContainer variant={isOwner ? "highlight" : "primary"}>
      <UserDetails>
        <section>
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar alt="avatar" src={rating.user.avatar_url!} />
          </Link>
          <div>
            <Typography.Heading size="xs">
              {rating.user.name}
            </Typography.Heading>
            <Typography.Text size="sm" color="gray-400">
              {distance}
            </Typography.Text>
          </div>
        </section>

        <RatingStars rating={rating.rate} />
      </UserDetails>

      <Typography.Text size="sm" color="gray-300">
        {rating.description}
      </Typography.Text>
    </UserRatingCardContainer>
  );
};
