import { ComponentProps } from "@stitches/react";

import { TextContainer } from "./styles";

import { PropsWithChildren } from "react";

export type TextProps = ComponentProps<typeof TextContainer> &
  PropsWithChildren;
