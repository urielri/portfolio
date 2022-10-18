import useSWR from "swr";
import { FC , useLayoutEffect, useRef} from "react";
import s from "./s.module.css";
import { _Props, _Project } from "interface";
import { get } from "service";
import Project from "components/utils/project";
import gsap  from 'gsap'

const List: FC = () => {
  const { data } = useSWR("/projects", (e) => get<_Project[]>(e, "project"), {
    suspense: true,
  });
  const ref: any = useRef()
    const q = gsap.utils.selector(ref);
  useLayoutEffect(()=> {
    if(data?.loading) return
     gsap.fromTo(q(".el"), {
      opacity: 0
    }, {
      opacity: 1,
      duration: .4,
      stagger: 0.1
    });
  }, [data])
  return (
    <div className={s.list} ref={ref}>
      {data?.data?.map((v: _Project) => (
        <Project
          card={{ loading: false, view: "simple" }}
          data={v}
          key={v._id}
        />
      ))}
  
    </div>
  );
};
export default List;
