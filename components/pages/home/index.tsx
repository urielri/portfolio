import { Case, Star, Fire } from "icons/interactive/status";
import { useRouter } from "next/router";
import { FC, useEffect, Suspense } from "react";
import Option from "components/utils/menu/option";
import s from "./s.module.css";
import Card from "components/utils/card";
import { Filter, Grid } from "icons/interactive";
import useSWR from "swr";
import { _Props, _Project } from "interface";
import { get, getProjects } from "service";
import {ErrorFallback, ErrorBoundary} from "components/utils/error";
import Project from "components/utils/project";
export const Content: FC = () => {

  return (
    <div className={s.home}>
      <div className={s.main}>
        <h1>Proyectos</h1>
        <div className={s.optionsList}>
          <div className={s.filter}>
            <span>Todos</span>
            <Filter />
          </div>
          <div className={s.grid}>
            <Option
              icon={<Grid />}
              label="Grilla"
              action={() => console.log("pum")}
            />
          </div>
        </div>
      </div>
    <ErrorBoundary fallback={<ErrorFallback error={'s'} resetErrorBoundary={() => console.log('aa')} />}>
        <Suspense fallback={<h1>Cargando</h1>}>
         <List/>
        </Suspense>
    </ErrorBoundary>
    </div>
  );
};
const List: FC = () => {
  const { data } = useSWR('/projects', (e) => { return get<_Project[]>(e, 'project') }, {suspense: true});
  //useEffect(() => { console.log("sss", data ) }, []);
//      {data?.data.map((v: _Project) => <Project card={{ loading: false, view: "simple" }} data={v} key={v._id} />)}
  return(
    <div className={s.list}>
      {data?.data?.map((v: _Project) => <Project card={{ loading: false, view: "simple" }} data={v} key={v._id} />)}
    </div>
  )
}
//<Card loading={false} data={v} key={v._id} view={"complete"}/>
export const Options: FC = () => {
  const router = useRouter();
  return (
    <>
      <Option
        icon={<Case view={router.asPath === "/" ? "filled" : "broken"} />}
        label="Proyectos"
        action={() => console.log("a")}
        active={router.asPath === "/" && true}
      />
      <Option
        icon={<Star view={router.asPath === "/p" ? "filled" : "broken"} />}
        label="Propios"
        action={() => console.log("a")}
        active={router.asPath === "/p" && true}
      />
      <Option
        icon={<Fire view={router.asPath === "/ps" ? "filled" : "broken"} />}
        label="Propios"
        action={() => console.log("a")}
        active={router.asPath === "/ps" && true}
      />
    </>
  );
};