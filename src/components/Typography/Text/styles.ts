import { styled } from "@/styles";

export const TextContainer = styled("p", {
  lineHeight: "$base",

  variants: {
    size: {
      sm: {
        fontSize: "$sm",
      },
      md: {
        fontSize: "$md",
      },
      lg: {
        fontSize: "$xl",
      },
    },

    color: {
      "gray-100": {
        color: "$gray100",
      },
      "gray-200": {
        color: "$gray200",
      },
      "gray-300": {
        color: "$gray300",
      },
      "gray-400": {
        color: "$gray400",
      },
    },
  },

  defaultVariants: {
    size: "md",
    color: "gray-100",
  },
});
