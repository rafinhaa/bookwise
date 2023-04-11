import { useRouter } from "next/router";
import Image from "next/image";
import { SignIn, SignOut } from "phosphor-react";
import { signOut, useSession } from "next-auth/react";

import { Navigation } from "../Navigation";
import { Avatar } from "../Avatar";
import { Typography } from "../Typography";

import { Container, LoginButton, UserDetails } from "./styles";

export const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user;

  const handleOpenProfile = () => {
    router.push(`/profile/${user?.id}`);
  };

  return (
    <Container>
      <div>
        <Image
          className="logo"
          src="/bookwise-logo.svg"
          alt="BookWise Logo"
          width={128}
          height={32}
        />

        <Navigation />
      </div>

      <footer>
        {!user ? (
          <LoginButton href="/sign-in">
            Fazer login
            <SignIn size={20} />
          </LoginButton>
        ) : (
          <UserDetails>
            <Avatar
              size="sm"
              src={user?.avatar_url}
              alt={user?.name}
              onClick={handleOpenProfile}
              cursorPoint
            />
            <Typography.Text size="sm">{user?.name}</Typography.Text>
            <SignOut color="#F75A68" size={20} onClick={() => signOut()} />
          </UserDetails>
        )}
      </footer>
    </Container>
  );
};
