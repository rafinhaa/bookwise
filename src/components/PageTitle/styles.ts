import { styled } from "@/styles";

export const PageTitleContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  svg: {
    color: "$green100",
  },

  variants: {
    marginBottom: {
      true: {
        marginBottom: 40,
      },
    },
  },
});
