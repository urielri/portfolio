import { Case, Star, Fire } from "icons/interactive/status";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Option from "components/utils/menu/option";
import s from "./s.module.css";
import Card from "components/utils/card";
import { Filter, Grid } from "icons/interactive";
import useSWR from "swr";
import { getProjects } from "service";

export const Content: FC = () => {
 // const { data, error } = useSWR(getProjects());
  useEffect(() => { 
   // console.log({data, error})
   async function q() {
     const q = await getProjects().then((r) => { return r });
     console.log(q)
   }
    q()
  },[])
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
      <div className={s.list}>
        <Card loading={true} view={"complete"} />
        <Card loading={true} view={"complete"} />
        <Card loading={true} view={"complete"} />
        <Card loading={true} view={"complete"} />
        <Card loading={true} view={"complete"} />
        <Card loading={true} view={"complete"} />
        <Card loading={true} view={"complete"} />
      </div>
    </div>
  );
};

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