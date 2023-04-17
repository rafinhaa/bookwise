import { ChartLineUp } from "phosphor-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import { PageTitle } from "@/components/PageTitle";
import { Typography } from "@/components/Typography";
import { RatingWithAuthorAndBook } from "@/components/RatingCard/types";
import { RatingCard } from "@/components/RatingCard";

import { Container, LatestContainer } from "./styles";
import { useSession } from "next-auth/react";
import { LinkButton } from "@/components/LinkButton";

export const LatestRatings = () => {
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(
    ["latest-ratings"],
    async () => {
      const { data } = await api.get("/ratings/latest");
      return data?.ratings || [];
    }
  );

  const { data: session } = useSession();

  const { data: latestUserRating } = useQuery<RatingWithAuthorAndBook>(
    ["latest-user-rating"],
    async () => {
      const { data } = await api.get(`/ratings/${session?.user.id}/latest`);
      return data?.ratings || null;
    },
    {
      enabled: !!session?.user.id,
    }
  );

  return (
    <Container>
      <PageTitle title="Início" icon={<ChartLineUp size={32} />} marginBottom />

      {latestUserRating && (
        <LatestContainer>
          <header>
            <Typography.Text size="sm">Sua última leitura</Typography.Text>

            <LinkButton
              text="Ver todas"
              href={`/profile/${session?.user.id}`}
            />
          </header>

          <RatingCard variant="compact" rating={latestUserRating} />
        </LatestContainer>
      )}

      <Typography.Text size="sm">Avaliações mais recentes</Typography.Text>

      <section>
        {ratings?.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </Container>
  );
};
