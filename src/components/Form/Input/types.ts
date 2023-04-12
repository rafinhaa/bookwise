import { InputHTMLAttributes, ReactNode } from "react";
import { CSS } from "@stitches/react/types/css-util";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  css?: CSS;
};
