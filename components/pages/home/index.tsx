import { FC, Suspense } from "react";
import Option from "components/utils/menu/option";
import s from "./s.module.css";
import { Filter, Grid } from "icons/interactive";
import { _Props, _Project } from "interface";
import { ErrorFallback, ErrorBoundary } from "components/utils/error";
import dynamic from "next/dynamic";
import Prev from "./prev";
const List = dynamic(() => import("./list"), {
  suspense: true,
  ssr: true,
});
const Content: FC = () => {
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
      <ErrorBoundary
        fallback={
          <ErrorFallback
            error={"s"}
            resetErrorBoundary={() => console.log("aa")}
          />
        }
      >
        <Suspense
          fallback={
           <Prev/>
          }
        >
          <List />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

//<Card loading={false} data={v} key={v._id} view={"complete"}/>
export default Content;
