import { ComponentProps } from "@stitches/react";
import { LinkButtonContainer } from "./styles";

export type LinkButtonProps = Omit<
  ComponentProps<typeof LinkButtonContainer>,
  "href"
> & {
  text: string;
  href?: string;
  onClick?: () => void;
  withoutIcon?: boolean;
};
