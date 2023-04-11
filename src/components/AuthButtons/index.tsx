import Image from "next/image";

import { AuthButton, Container } from "./styles";

import { AuthButtonsProps } from "./types";

export const AuthButtons = ({ canGuest }: AuthButtonsProps) => {
  return (
    <Container>
      <AuthButton>
        <Image
          src="/images/icons/google.svg"
          alt="Google Logo"
          width={32}
          height={32}
        />
        Entrar com Google
      </AuthButton>
      <AuthButton>
        <Image
          src="/images/icons/github.svg"
          alt="Github Logo"
          width={32}
          height={32}
        />
        Entrar com Github
      </AuthButton>
      {canGuest && (
        <AuthButton>
          <Image
            src="/images/icons/rocket-launch.svg"
            alt="Rocket Icon"
            width={32}
            height={32}
          />
          Acessar como visitante
        </AuthButton>
      )}
    </Container>
  );
};
