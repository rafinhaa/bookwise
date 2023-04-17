import Head from "next/head";

import { DefaultLayoutContent, DefaultLayoutContainer } from "./styles";

import type { DefaultLayoutProps } from "./types";
import { Sidebar } from "@/components/Sidebar";

export const DefaultLayout = ({ title, children }: DefaultLayoutProps) => {
  return (
    <DefaultLayoutContainer>
      <Head>
        <title>{`${title} | BookWise`}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <Sidebar />
      <DefaultLayoutContent>{children}</DefaultLayoutContent>
    </DefaultLayoutContainer>
  );
};
