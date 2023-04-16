import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

import { DefaultLayout } from "@/layouts/DefaultLayout";

import { ProfileContainer } from "./styles";

import { ProfileRatings } from "./components/ProfileRating";
import { ProfileDetails } from "./components/ProfileDetails";

import type { NextPageWithLayout } from "../_app.page";
import { ProfileData } from "./types";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const userId = router.query.id as string;

  const { data: profile } = useQuery<ProfileData>(
    ["profile", userId],
    async () => {
      const { data } = await api.get(`/profile/${userId}`);
      return data?.profile || {};
    },
    {
      enabled: !!userId,
    }
  );

  const isOwnProfile = userId === profile?.user.id;

  return (
    <ProfileContainer>
      {!!profile ? (
        <>
          <ProfileRatings
            isOwnProfile={isOwnProfile}
            ratings={profile?.ratings}
          />
          <ProfileDetails info={profile.info} user={profile.user} />
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </ProfileContainer>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Perfil">{page}</DefaultLayout>;
};

export default Profile;
