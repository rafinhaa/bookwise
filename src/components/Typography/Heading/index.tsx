import { HeadingContainer } from "./styles";

import { HeadingProps } from "./types";

export const Heading = ({ children, ...rest }: HeadingProps) => {
  return <HeadingContainer {...rest}>{children}</HeadingContainer>;
};
