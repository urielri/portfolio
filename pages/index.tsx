import { _LayoutType } from "interface";
import Layout from "components/utils/layout";
import { ReactElement } from "react";
import { Content, Options } from "components/pages/home";
import Head from "next/head";
const Home: _LayoutType = () => {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <Content />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout menu={<Options />}>{page}</Layout>;
};
export default Home;
