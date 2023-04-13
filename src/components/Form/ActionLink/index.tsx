import { ActionLinkContainer } from "./styles";

import { ActionIconProps } from "./types";

export const ActionIcon = ({ icon, iconColor, ...props }: ActionIconProps) => {
  return (
    <ActionLinkContainer
      {...props}
      css={{
        color: `$${iconColor}`,
      }}
    >
      {icon}
    </ActionLinkContainer>
  );
};
