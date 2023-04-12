import { ComponentProps } from "@stitches/react";
import { ReactNode } from "react";

import { PageTitleContainer } from "./styles";

export type PageTitleProps = ComponentProps<typeof PageTitleContainer> & {
  icon: ReactNode;
  title: string;
};
