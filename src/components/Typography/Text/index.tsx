import { TextContainer } from "./styles";

import { TextProps } from "./types";

export const Text = ({ children, ...rest }: TextProps) => {
  return <TextContainer {...rest}>{children}</TextContainer>;
};
