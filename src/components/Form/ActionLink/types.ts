import { ReactNode } from "react";

import { ComponentProps } from "@stitches/react";
import { theme } from "@/styles";

import { ActionLinkContainer } from "./styles";

export type ActionIconProps = ComponentProps<typeof ActionLinkContainer> & {
  icon: ReactNode;
  iconColor: keyof typeof theme.colors;
};
