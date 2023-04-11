import { styled } from "@/styles";
import Link from "next/link";

export const Container = styled("aside", {
  width: "232px",
  height: "calc(100% - 40px)",
  margin: 20,
  background: "linear-gradient(180deg, $gray700 0%, $gray600 100%)",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: 40,
  paddingBottom: 24,

  ".logo": {
    marginBottom: 64,
  },
});

export const LoginButton = styled(Link, {
  textDecoration: "none",
  color: "$gray200",
  fontWeight: 700,
  fontSize: "$md",
  display: "flex",
  alignItems: "center",
  gap: "$3",

  svg: {
    color: "$green100",
  },
});

export const UserDetails = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",

  svg: {
    cursor: "pointer",
  },

  p: {
    maxWidth: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
