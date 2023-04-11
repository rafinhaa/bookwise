import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { AuthButton, Container } from "./styles";

import { AuthButtonsProps, Provider } from "./types";

export const AuthButtons = ({
  canGuest,
  callbackUrl = "/",
}: AuthButtonsProps) => {
  const router = useRouter();

  const signInWithGoogle = () => signIn("google", { callbackUrl });
  const signInWithGithub = () => signIn("github", { callbackUrl });
  const redirectToHomepage = () => router.push("/");

  const handleSignIn = async (provider: Provider) => {
    const signInWithProvider = {
      google: signInWithGoogle,
      github: signInWithGithub,
      visitor: redirectToHomepage,
    }[provider];
    await signInWithProvider();
  };

  return (
    <Container>
      <AuthButton onClick={() => handleSignIn("google")}>
        <Image
          src="/images/icons/google.svg"
          alt="Google Logo"
          width={32}
          height={32}
        />
        Entrar com Google
      </AuthButton>
      <AuthButton onClick={() => handleSignIn("github")}>
        <Image
          src="/images/icons/github.svg"
          alt="Github Logo"
          width={32}
          height={32}
        />
        Entrar com Github
      </AuthButton>
      {canGuest && (
        <AuthButton onClick={() => handleSignIn("visitor")}>
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
