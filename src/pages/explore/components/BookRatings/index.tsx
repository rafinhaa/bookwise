import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";

import { Typography } from "@/components/Typography";
import { LinkButton } from "@/components/LinkButton";
import { LoginDialog } from "@/components/LoginDialog";
import { UserRatingCard } from "../UserRatingCard";
import { RatingForm } from "../RatingForm";

import { BookRatingsContainer } from "./styles";

import { BookRatingsProps } from "./types";

export const BookRatings = ({ bookId, ratings, canRate }: BookRatingsProps) => {
  const { status } = useSession();
  const [showForm, setShowForm] = useState(false);

  const isAuthenticated = status === "authenticated";

  const handleRate = () => {
    if (!isAuthenticated) return;
    setShowForm((oldState) => !oldState);
  };

  const RatingWrapper = isAuthenticated ? Fragment : LoginDialog;

  const showRatingButton = canRate || !isAuthenticated;

  return (
    <BookRatingsContainer>
      <header>
        <Typography.Text>Avaliações</Typography.Text>
        {showRatingButton && (
          <RatingWrapper>
            <LinkButton
              withoutIcon
              onClick={handleRate}
              text="Avaliar"
              color="purple"
            />
          </RatingWrapper>
        )}
      </header>

      <section>
        {showForm && (
          <RatingForm bookId={bookId} onCancel={() => setShowForm(false)} />
        )}
        {ratings.map((rating) => (
          <UserRatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </BookRatingsContainer>
  );
};
