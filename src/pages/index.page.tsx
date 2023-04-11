import { DefaultLayout } from "@/layouts/DefaultLayout";
import { NextPageWithLayout } from "./_app.page";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1>Hello world!</h1>
    </>
  );
};

Home.getLayout = (page) => <DefaultLayout title="Inicio">{page}</DefaultLayout>;

export default Home;
