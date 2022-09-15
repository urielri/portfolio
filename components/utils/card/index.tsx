import { ExternalLink } from "icons/interactive";
import { FC } from "react";
import Tag from "../tag";
import s from "./s.module.css";
interface Props {
  view: "simple" | "complete";
  loading: boolean;
}
const Card: FC<Props> = () => {
  return (
    <div className={s.card}>
      <div className={s.primary}>
        <div className={s.logo}></div>
        <h2>Proyecto name</h2>
      </div>
      <div className={s.occupation}>
        <Tag size="m" label="comela" />
      </div>
      <div className={s.links}>
        <div className={s.link}>
          <span>gentem.org</span>
          <ExternalLink />
        </div>
      </div>
      <div className={s.moreInfo}>
        <p>+3 tecnologias utilizadas</p>
      </div>
    </div>
  );
};
export default Card;
