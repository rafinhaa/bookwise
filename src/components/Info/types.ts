import { ReactNode } from "react";
import { ComponentProps } from "@stitches/react";

import { InfoContainer } from "./styles";

export type InfoProps = ComponentProps<typeof InfoContainer> & {
  icon: ReactNode;
  title: string;
  info: string;
};
