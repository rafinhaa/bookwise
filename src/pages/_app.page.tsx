import { SessionProvider } from "next-auth/react";

import { globalStyles } from "@/styles/global";
import { Nunito } from "next/font/google";

import type { AppProps } from "next/app";

export const nunito = Nunito({
  subsets: ["latin"],
});

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
