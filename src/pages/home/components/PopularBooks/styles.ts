import { styled } from "@/styles";

export const Container = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "$4",
  marginTop: 77,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  "> section": {
    display: "flex",
    flexDirection: "column",
    gap: "$3",
  },
});
