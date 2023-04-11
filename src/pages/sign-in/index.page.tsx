import { Typography } from "@/components/Typography";
import { AuthButtons } from "@/components/AuthButtons";

import { LogoSection, SignInSection, SingInContainer } from "./styles";

const SignIn = () => {
  return (
    <SingInContainer>
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
