import { useMemo, useState } from "react";
import { MagnifyingGlass, User } from "phosphor-react";

import { Typography } from "@/components/Typography";
import { LinkButton } from "@/components/LinkButton";
import { PageTitle } from "@/components/PageTitle";
import { Input } from "@/components/Form/Input";
import { ProfileRatingCard } from "../ProfileCardRating";

import { ProfileRatingContainer, RatingsList } from "./styles";

import { ProfileRatingsProps } from "./types";

export const ProfileRatings = ({
  ratings,
  isOwnProfile,
}: ProfileRatingsProps) => {
  const [search, setSearch] = useState("");

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return rating.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [ratings, search]);

  return (
    <ProfileRatingContainer>
      {isOwnProfile ? (
        <PageTitle icon={<User size={25} />} title="Perfil" />
      ) : (
        <LinkButton
          href="/"
          text="Voltar"
          iconSide="left"
          color="white"
          css={{ alignSelf: "flex-start" }}
        />
      )}
      <Input
        placeholder="Buscar livro avaliado"
        icon={<MagnifyingGlass size={20} />}
        css={{ marginTop: 40, marginBottom: 32 }}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <RatingsList>
        {filteredRatings?.map((rating) => (
          <ProfileRatingCard key={rating.id} rating={rating} />
        ))}
        {filteredRatings.length <= 0 && (
          <>
            <Typography.Text color="gray-400" css={{ textAlign: "center" }}>
              {search
                ? "Nenhum resultado encontrado"
                : "Nenhuma avaliação encontrada"}
            </Typography.Text>
          </>
        )}
      </RatingsList>
    </ProfileRatingContainer>
  );
};
