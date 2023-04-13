import { Typography } from "@/components/Typography";

import { InfoContainer } from "./styles";

import { InfoProps } from "./types";

export const Info = ({ icon, title, info, ...rest }: InfoProps) => {
  return (
    <InfoContainer {...rest}>
      {icon}
      <div>
        <Typography.Text size="sm" color="gray-300">
          {title}
        </Typography.Text>
        <Typography.Heading size="sm" color="gray-200">
          {info}
        </Typography.Heading>
      </div>
    </InfoContainer>
  );
};
