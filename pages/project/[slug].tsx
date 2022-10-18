import { _LayoutType, _Project, _Props } from "interface";
import { getProject, slugs } from "service";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { ReactElement, Suspense } from "react";
import Layout from "components/utils/layout";
import Head from "next/head";
import Options from "components/pages/project/menu";
import { SWRConfig, unstable_serialize } from "swr";
import { ErrorBoundary, ErrorFallback } from "components/utils/error";
import { useRecoilValue } from "recoil";
import { meta as metaAtom } from "atoms";
import Content from "../../components/pages/project";
import dynamic from "next/dynamic";
const SuspenseComponent = dynamic(
  () => import("../../components/pages/project"),
  { suspense: true, ssr: true }
);
interface Fallback {
  [key: string]: _Project;
}
const Project: _LayoutType<_Props<Fallback>> = ({
  fallback,
  status,
  loading,
  slug,
}) => {
  const meta = useRecoilValue(metaAtom);
  //console.log(fallback);
  //console.log(slug);
  return (
    <>
      <Head>
        <title>{meta.title} | Proyecto</title>
      </Head>
      <SWRConfig value={{ fallback }}>
        <SuspenseComponent slug={slug || ""} />
      </SWRConfig>
    </>
  );
};
Project.getLayout = (page: ReactElement) => {
  return <Layout menu={<Options />}>{page}</Layout>;
};
export const getStaticProps: GetStaticProps<any, { slug: string }> = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const slug = context?.params?.slug ?? "";
  if (slug !== "") {
    const q = await getProject(slug);
    // /unstable_serialize(["project", slug])
    return {
      props: {
        fallback: { [`/project/${slug}`]: q },
        //   fallback: { [unstable_serialize(["/project/", slug])]: q },
        loading: q.loading,
        status: q.status,
        slug,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/404",
      },
      props: {},
    };
  }
};
export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  // const slugs = [{ params: { slug: "ss" } }];
  const q = await slugs();
  const result = q.data.map((res: any) => {
    return {
      params: {
        slug: res.slug,
      },
    };
  });
  return {
    paths: result,
    fallback: true,
  };
};
/*
  <ErrorBoundary
        fallback={
          <ErrorFallback
            error={"undefined"}
            resetErrorBoundary={() => console.log("a")}
          />
        }
      >
        <Suspense fallback={<>cargando</>}>
          {" "}
          <SWRConfig value={{ fallback }}>
            <SuspenseComponent slug={slug || ""} />
          </SWRConfig>
        </Suspense>
      </ErrorBoundary>
*/
//intentar hacer funcionar la app  sin conexion a internet, solo para ver como se comporta

export default Project;
