import { ChartLineUp } from "phosphor-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import { PageTitle } from "@/components/PageTitle";
import { Typography } from "@/components/Typography";
import { RatingWithAuthorAndBook } from "@/components/RatingCard/types";
import { RatingCard } from "@/components/RatingCard";

import { Container, LatestContainer } from "./styles";

export const LatestRatings = () => {
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(
    ["latest-ratings"],
    async () => {
      const { data } = await api.get("/ratings/latest");
      return data?.ratings || [];
    }
  );

  return (
    <Container>
      <PageTitle title="Início" icon={<ChartLineUp size={32} />} marginBottom />

      <LatestContainer>
        <header>
          <Typography.Text size="sm">Sua última leitura</Typography.Text>
        </header>
      </LatestContainer>

      <Typography.Text size="sm">Avaliações mais recentes</Typography.Text>

      <section>
        {ratings?.map((rating) => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </Container>
  );
};
