import { FC, useState, Suspense, useEffect, useRef } from "react";
import s from "./s.module.css";
import Forms from "./forms";
//head
import { NextRouter, useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { newModal as newAtom, route as routeAtom } from "atoms";
import { Filter as FilterIcon, More } from "icons/interactive";
//list
import { ErrorFallback, ErrorBoundary } from "components/utils/error";
import dynamic from "next/dynamic";
//new
import gsap from "gsap";
import { Arrow } from "icons/interactive";
import List from "./list"
/*
const List = dynamic(() => import("./list"), {
  suspense: true,
  ssr: true,
});*/
const Content: FC<{ section: string }> = ({ section }) => {
  return (
    <div className={s.manage}>
      <div className={s.row}>
        <Head />
      <List section={''}/>
      </div>
      <New />
    </div>
  );
};
/*
 <ErrorBoundary
          fallback={
            <ErrorFallback
              error={"s"}
              resetErrorBoundary={() => console.log("aa")}
            />
          }
        >
          <Suspense fallback={<>cargando</>}>
            <List section={section} />
          </Suspense>
        </ErrorBoundary>
*/
type r = NextRouter & {
  query: any;
};
const Head: FC = () => {
  const router: r = useRouter();
  const [form, setNew] = useRecoilState(newAtom);
  const setRoute = useSetRecoilState(routeAtom);
  useEffect(() => {
    const path =
      router.asPath === "/manage" ? "/manage?section=projects" : router.asPath;
    const route =
      router.route === "/manage" ? "/manage?section=projects" : router.route;
    const section = router.query.section;
    let name = "";
    if (router.asPath === "/manage") {
      name = "projects";
    }
    if (section) {
      name = section;
    }
    setRoute(() => {
      return { path: path, name: name || "", route: route };
    });
  }, [router]);
  return (
    <div className={s.head}>
      <h1>Gestionar</h1>
      {!form && (
        <div onClick={() => setNew((e) => !e)} className={s.action}>
          <More />
          <span>Crear nuevo</span>
        </div>
      )}
      <Filter />
    </div>
  );
};
const Filter: FC = () => {
  const router = useRouter();
  const route = useRecoilValue(routeAtom);
  const [menu, setMenu] = useState(false);
  const setWindowNew = useSetRecoilState(newAtom);
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);
  useEffect(() => {
    if (menu) {
      gsap.to(q("#menu"), { duration: 0.1, opacity: 1, display: "flex" });
    } else {
      gsap.to(q("#menu"), { duration: 0.1, opacity: 0, display: "none" });
    }
  }, [menu]);
  useEffect(() => {
    setWindowNew(() => false);
  }, [route]);
  const check = () => {
    menu && setMenu(false);
  };
  const push = (v: string) => {
    router.push(`/manage?section=${v}`);
  };
  return (
    <div className={s.filter} ref={ref}>
      {menu && <div className={s.empty} onClick={() => setMenu(false)}></div>}
      <div className={s.selected} onClick={() => setMenu(true)}>
        <span>{route.name}</span>
        <div className={s.icon}>
          <FilterIcon />
        </div>
      </div>
      <div className={s.options} id="menu" onClick={() => check()}>
        <div className={s.option} onClick={() => push("resources")}>
          <span>Resources</span>
        </div>
        <div className={s.option} onClick={() => push("media")}>
          <span>Media</span>
        </div>
        <div className={s.option} onClick={() => push("projects")}>
          <span>Projects</span>
        </div>
      </div>
    </div>
  );
};
const New: FC = () => {
  const open = useRecoilValue(newAtom);
  const ref: any = useRef();
  const setWindowNew = useSetRecoilState(newAtom);
  const q = gsap.utils.selector(ref);
  const [collapsed, setCollapsed] = useState(false);
  const route = useRecoilValue(routeAtom);
  useEffect(() => {
    if (open) {
      gsap
        .timeline()
        .to(ref.current, {
          display: "flex",
          opacity: 1,
          width: 300,
          duration: 0.2,
        })
        .to(q("#content"), { duration: 0.1, opacity: 1 });
    } else {
      gsap
        .timeline()
        .to(q("#content"), { duration: 0.1, opacity: 0 })
        .to(ref.current, {
          duration: 0.2,
          width: 0,
          opacity: 0,
          display: "none",
        });
    }
  }, [open]);
  useEffect(() => {
    if (collapsed) {
      gsap
        .timeline()
        .to(q("#icon"), { duration: 0.1, rotate: 180 })
        .to(q("#content"), { duration: 0.1, opacity: 0 })
        .to(ref.current, { width: 72, duration: 0.2, delay: 0.1 });
    } else {
      gsap
        .timeline()
        .to(q("#icon"), { duration: 0.1, rotate: 0 })
        .to(ref.current, { width: 300, duration: 0.2 })
        .to(q("#content"), { duration: 0.1, opacity: 1 });
    }
  }, [collapsed]);
  if (route.name === "projects") {
    return <Forms name="projects" />;
  } else {
    return (
      <div className={s.new} ref={ref} id="new">
        <div className={s.headNew}>
          <h1 id="title">form</h1>
          <div onClick={() => setCollapsed((e) => !e)} className={s.collap}>
            <div id="icon" className={s.icon}>
              <Arrow rotate={-90} />
            </div>
          </div>
        </div>
        <div className={s.content} id="content">
          <div className={s.form}>
            <Forms name={route.name} />
          </div>
          <div
            onClick={() => setWindowNew(() => false)}
            className={s.closeWindow}
          >
            <span>Cerrar ventana</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Content;
