import { ExternalLink } from "icons/interactive";
import { _Project } from "interface";
import { FC, ReactNode, useEffect } from "react";
import { get } from "service";
import useSWR from "swr";
import s from "./styles.module.css";
import { meta as metaAtom } from "atoms";
import { useRecoilState } from "recoil";
import Image from "next/image";
interface Props {
  slug: string;
}
//    slug !== ''? `/project/${slug}` : null
//  ["/project/", slug],
 const Content: FC<Props> = ({ slug }) => {
  const [, setMeta] = useRecoilState(metaAtom);
  const { data } = useSWR(
   slug !== ''? `/project/${slug}` : null,
    (e) => get<_Project>(e, "project"),
    { suspense: true }
  );
  useEffect(() => {
    //  const doc = document.firstElementChild;
    const doc: any = document.querySelector(":root");
    doc &&
      data?.data &&
      doc.style.setProperty(
        "--color-project",
        data?.data.images[0]?.color || "var(--grey)"
      );
    data?.data && setMeta({ title: data.data.name });
  }, [data]);
  return (
    <div className={s.project}>
      <div
        className={s.hero}
        style={{ backgroundColor: "var(--color-project)" }}
      >
        <div className={s.presentation}>
          {data?.data.images[0] && (
            <Image
              alt={data.data.images[0].alt}
              src={data.data.images[0].link}
              width={180}
              height={180}
            />
          )}
          <h1>{data?.data.name}</h1>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.body}>
          <div className={s.extras}>
            <div className={s.date}>
              <span className={s.time}>fecha</span>
              {data?.data.dates.isActive && (
                <div className={s.tagActive}>
                  <span>Actualmente</span>
                </div>
              )}
            </div>
            <div className={s.link}>
              <a href={data?.data.links[0]} target="_blank" rel="noreferrer">
                <span>{data?.data.links[0]}</span>
                <ExternalLink />
              </a>
            </div>
          </div>
          <div className={s.description}>
            <h1>
              Sobre{" "}
              <span style={{ color: "var(--color-project)" }}>
                {data?.data.name}
              </span>
            </h1>
            <p>{data?.data.description}</p>
          </div>
        </div>
        <div className={s.moreInfo}>
          <ListItems title="Recursos">
            {data?.data.resources.map((res) => (
              <div key={res.link}>{res.name}</div>
            ))}
          </ListItems>
          <ListItems title="Tecnologias">
            {data?.data.techs.map((res) => (
              <div key={res.link}>{res.name}</div>
            ))}
          </ListItems>
          <ListItems title="Metodologias">
            {data?.data.methodologies.map((res) => (
              <div key={res}>{res}</div>
            ))}
          </ListItems>
          <ListItems title="Herramientas">
            {data?.data.tools.map((res) => (
              <div key={res}>{res}</div>
            ))}
          </ListItems>
        </div>
      </div>
    </div>
  );
};
const ListItems: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className={s.row}>
      <h3>{title}</h3>
      <div className={s.list}>{children}</div>
    </div>
  );
};
export default Content