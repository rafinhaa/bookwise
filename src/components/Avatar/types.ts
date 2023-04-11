import { ComponentProps } from "@stitches/react";
import { AvatarContainer } from "./styles";

export type AvatarProps = ComponentProps<typeof AvatarContainer> & {
  src: string;
  size?: "sm" | "md" | "lg";
  alt: string;
};
