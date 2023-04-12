import { PropsWithChildren } from "react";
import { ComponentProps } from "@stitches/react";

import { TagContainer } from "./styles";

export type TagProps = ComponentProps<typeof TagContainer> &
  PropsWithChildren & {
    active?: boolean;
  };
