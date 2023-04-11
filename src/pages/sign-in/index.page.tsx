import Head from "next/head";

import { Typography } from "@/components/Typography";
import { AuthButtons } from "@/components/AuthButtons";

import { LogoSection, SignInSection, SingInContainer } from "./styles";

const SignIn = () => {
  return (
    <SingInContainer>
      <Head>
        <title>Sign In | BookWise</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <LogoSection />
      <SignInSection>
        <Typography.Heading size="lg" color="gray-100">
          Boas vindas!
        </Typography.Heading>
        <Typography.Text color="gray-200">
          Faça seu login ou acesse como visitante.
        </Typography.Text>
        <AuthButtons canGuest />
      </SignInSection>
    </SingInContainer>
  );
};

export default SignIn;
