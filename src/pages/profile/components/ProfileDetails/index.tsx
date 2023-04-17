import { BookOpen, BookmarkSimple, Books, UserList } from "phosphor-react";

import { Typography } from "@/components/Typography";
import { Avatar } from "@/components/Avatar";
import { Info } from "@/components/Info";

import {
  ProfileDetailsContainer,
  ProfileDetailsWrapper,
  UserInfo,
} from "./styles";

import { ProfileDetailsProps } from "./types";
import { getDetailedTimeInTimeZoneBr } from "@/util/dateAndTimeUtils";

export const ProfileDetails = ({ info, user }: ProfileDetailsProps) => {
  const memberSinceYear = new Date(user.created_at).getFullYear();

  const detailedDate = getDetailedTimeInTimeZoneBr(user.created_at);

  return (
    <ProfileDetailsContainer>
      <UserInfo>
        <Avatar size="lg" alt={user.name} src={user.avatar_url!} />
        <Typography.Heading size="md" css={{ marginTop: 20 }}>
          {user.name}
        </Typography.Heading>
        <Typography.Text size="sm" color="gray-400" title={detailedDate}>
          membro desde {memberSinceYear}
        </Typography.Text>
      </UserInfo>

      <ProfileDetailsWrapper>
        <Info
          icon={<BookOpen />}
          info={String(info.readPages)}
          title="Páginas lidas"
          invertInfo
        />
        <Info
          icon={<Books />}
          info={String(info.ratedBooks)}
          title="Livros avaliados"
          invertInfo
        />
        <Info
          icon={<UserList />}
          info={String(info.readAuthors)}
          title="Autores lidos"
          invertInfo
        />
        {info?.mostReadCategory && (
          <Info
            icon={<BookmarkSimple />}
            info={String(info.mostReadCategory)}
            title="Categoria mais lida"
            invertInfo
          />
        )}
      </ProfileDetailsWrapper>
    </ProfileDetailsContainer>
  );
};
