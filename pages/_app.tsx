import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { RecoilRoot } from "recoil";
type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppLayout = AppProps & {
  Component: NextPageLayout;
};
function MyApp({ Component, pageProps }: AppLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}

export default MyApp;
