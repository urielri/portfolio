import { _LayoutType, _Project, _Props } from "interface";
import { getProject } from "service";
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import { ReactElement } from "react";
import Layout from "components/utils/layout";
import { Options } from "components/pages/home";

interface Fallback {
    [key: string]: _Project
}
const Project: _LayoutType<_Props<Fallback>> = ({fallback, status, loading}) => {
    return (
        <></>
    )
}
Project.getLayout = (page: ReactElement) => {
    return <Layout menu={<Options />}>{page}</Layout>;
};
export const getStaticProps: GetStaticProps<any, { slug: string }> = async (context: GetStaticPropsContext<{ slug: string }>) => {
    const slug = context?.params?.slug ?? "";
    if (slug !== "") {
        const s = `/project/${slug}`
        const q = await getProject(slug);
        return {
            props: {
                fallback: { [s]: q.data },
                loading: q.loading,
                status: q.status
            }
        }
    } else {
        return {
            redirect: {
                destination: '/404'
            }
            , props: {}
        }
    }
}
export const getStaticPaths: GetStaticPaths = (context: GetStaticPathsContext) => {
    const slugs = [{ params: { slug: 'newSlug' }}]
    return {
        paths: slugs,
        fallback: false,
    }
}
export default Project