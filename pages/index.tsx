import { _LayoutType, _Project, _Props } from "interface";
import Layout from "components/utils/layout";
import { ReactElement } from "react";
import Content from "components/pages/home";
import Options from "components/pages/home/menu";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getProjects } from "service";
import { SWRConfig } from "swr";

interface Fallback {
  "/projects": _Project[];
}
const Home: _LayoutType<_Props<Fallback>> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <Content />
      </SWRConfig>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const q = await getProjects();
  return {
    props: {
      fallback: { "/projects": q },
    },
  };
};
Home.getLayout = (page: ReactElement) => {
  return <Layout menu={<Options />}>{page}</Layout>;
};
export default Home;
