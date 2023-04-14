import { styled } from "@stitches/react";

export const BookRatingsContainer = styled("section", {
  display: "flex",
  flexDirection: "column",
  marginTop: 40,

  "> header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "$4",
  },

  "> section": {
    display: "flex",
    flexDirection: "column",
    gap: "$3",
  },
});
