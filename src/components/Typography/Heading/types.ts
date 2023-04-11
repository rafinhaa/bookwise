import { ComponentProps } from "@stitches/react";

import { HeadingContainer } from "./styles";

import { PropsWithChildren } from "react";

export type HeadingProps = ComponentProps<typeof HeadingContainer> &
  PropsWithChildren;
