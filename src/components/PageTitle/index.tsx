import { Typography } from "../Typography";

import { PageTitleContainer } from "./styles";

import { PageTitleProps } from "./types";

export const PageTitle = ({ title, icon, ...props }: PageTitleProps) => {
  return (
    <PageTitleContainer {...props}>
      {icon}
      <Typography.Heading size="lg">{title}</Typography.Heading>
    </PageTitleContainer>
  );
};
