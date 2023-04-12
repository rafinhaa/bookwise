import { TagContainer } from "./styles";

import { TagProps } from "./types";

export const Tag = ({ children, active, ...props }: TagProps) => {
  return (
    <TagContainer active={active} {...props}>
      {children}
    </TagContainer>
  );
};
