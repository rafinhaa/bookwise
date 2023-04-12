import { ReactElement } from "react";

import { DefaultLayout } from "@/layouts/DefaultLayout";

import { HomeContainer } from "./styles";

import type { NextPageWithLayout } from "../_app.page";

const Home: NextPageWithLayout = () => {
  return <HomeContainer></HomeContainer>;
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Início">{page}</DefaultLayout>;
};

export default Home;
