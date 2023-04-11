import { Binoculars, ChartLineUp, User } from "phosphor-react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { NavigationContainer, NavItemContainer } from "./styles";

const ICON_SIZE = 24;

export const Navigation = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <NavigationContainer>
      <NavItemContainer href="/" active={router.asPath === "/"}>
        <ChartLineUp size={ICON_SIZE} />
        Início
      </NavItemContainer>
      <NavItemContainer href="/explore" active={router.asPath === "/explore"}>
        <Binoculars size={ICON_SIZE} />
        Explorar
      </NavItemContainer>
      {session && (
        <NavItemContainer
          href={`/profile/${session.user.id}`}
          active={router.asPath === `/profile/${session.user.id}`}
        >
          <User size={ICON_SIZE} />
          Perfil
        </NavItemContainer>
      )}
    </NavigationContainer>
  );
};
