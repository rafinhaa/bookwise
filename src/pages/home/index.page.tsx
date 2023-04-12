import { ReactElement } from "react";

import { DefaultLayout } from "@/layouts/DefaultLayout";

import { HomeContainer } from "./styles";

import type { NextPageWithLayout } from "../_app.page";
import { LatestRatings } from "./components/LatestRatings";

const Home: NextPageWithLayout = () => {
  return (
    <HomeContainer>
      <LatestRatings />
    </HomeContainer>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <DefaultLayout title="Início">{page}</DefaultLayout>;
};

export default Home;
