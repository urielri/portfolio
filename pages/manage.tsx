import Options from "components/pages/home/menu";
import Layout from "components/utils/layout";
import { _LayoutType, _Project, _Props } from "interface";
import { ReactElement, useEffect } from "react";
import Content from "components/pages/manage";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { resources } from "service";
import { SWRConfig } from "swr";
import { atom, useRecoilState } from "recoil";
import {section as sectionAtom} from 'atoms'
interface Fallback {
  [key: string]: _Project;
}
const Manage: _LayoutType<_Props<Fallback>> = ({ fallback, slug }) => {
  const [, setSection] = useRecoilState(sectionAtom);
  useEffect(() => {
    slug && setSection(slug);
  }, [slug]);
  return (
    <>
      <Head>
        <title>Manage</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <Content section={slug || ""} />
      </SWRConfig>
    </>
  );
};

Manage.getLayout = (page: ReactElement) => {
  return <Layout menu={<Options />}>{page}</Layout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ section: string }>
) => {
  if (!context.query.section) {
    return { redirect: { destination: "/manage?section=projects" }, props: {} };
  } else {
    const query: string = context.query.section as string;
    let d = null;
    if (query === "resources") {
      d = await resources();
    }

    return { props: { fallback: { [`/${query}`]: d }, slug: query } };
  }
};
export default Manage;
