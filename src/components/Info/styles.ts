import { styled } from "@stitches/react";

export const InfoContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$4",

  "> div": {
    display: "flex",
    flexDirection: "column",
  },

  svg: {
    color: "$green100",
  },

  variants: {
    invertInfo: {
      true: {
        "> div": {
          flexDirection: "column-reverse",
        },
      },
    },
    iconSize: {
      md: {
        svg: {
          width: 24,
          height: 24,
        },
      },
      lg: {
        svg: {
          width: 32,
          height: 32,
        },
      },
    },
  },
  defaultVariants: {
    iconSize: "md",
  },
});
