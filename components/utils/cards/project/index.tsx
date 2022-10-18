import { ExternalLink } from "icons/interactive";
import { _Project } from "interface";
import { FC } from "react";
import Tag from "../../tag";
import s from "./s.module.css";
import { cardProjectFamily as projectAtom } from "atoms";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import Skeleton from "../../skeleton";
interface Props {
  view: "simple" | "complete";
  loading: boolean;
  data: _Project | null;
  id: string;
}
const Card: FC<Props> = ({ view, loading, data, id }) => {
  const p = useRecoilValue(projectAtom(id));
  return (
    <div className={`el ${s.card}`}>
      <Link href={`/project/${p.slug}`}>
        <div className={s.primary}>
          <div
            className={s.logo}
            style={{ backgroundColor: p.logo.color }}
          ></div>
          <h2>{p.name}</h2>
        </div>
      </Link>
      <div className={s.occupation}>
        {p.occupation.length < 1 ? (
          <>
            <span>No se especifica</span>
          </>
        ) : (
          <>
            {p.occupation.map((v) => (
              <Tag size="m" label={v} key={v} />
            ))}
          </>
        )}
      </div>
      <div className={s.links}>
        {p.links.length < 1 ? (
          <div className={s.link}>
            <span>Sin links</span>
          </div>
        ) : (
          <>
            {" "}
            {p.links.map((v) => (
              <Link href={v} key={v}>
                <div className={s.link}>
                  <span>{v}</span>
                  <ExternalLink />
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
      <div className={s.moreInfo}>
        {p.techs === 0 ? (
          <p>Sin tecnologias implementadas</p>
        ) : (
          <p>+{p.techs} tecnologias utilizadas</p>
        )}
      </div>
    </div>
  );
};

const CardPrev: FC = () => {
  return (
    <div className={s.card}>
      <div className={s.primary}>
        <Skeleton animation={false} width={80} height={80} bRadius={100} loading={true} />
        <Skeleton animation={false} width={240} height={36} loading={true} />
      </div>
      <div className={s.occupation}>
             <Skeleton animation={false} width={80} loading={true}/>
      </div>
      <div className={s.links}>
       <Skeleton  animation={false} width={80} loading={true}/>
      </div>
      <div className={s.moreInfo}>
        <Skeleton animation={false} width={80} loading={true}/>
      </div>
    </div>
  );
};
export  {Card, CardPrev};
