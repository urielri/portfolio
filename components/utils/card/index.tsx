import { ExternalLink } from "icons/interactive";
import { _Project } from "interface";
import { FC } from "react";
import Tag from "../tag";
import s from "./s.module.css";
import { cardProjectFamily as projectAtom} from 'atoms'
import { useRecoilValue } from "recoil";
interface Props {
  view: "simple" | "complete";
  loading: boolean;
  data: _Project | null
  id: string
}
const Card: FC<Props> = ({view, loading, data, id}) => {
const p = useRecoilValue(projectAtom(id));
console.log("pppp", p)
  return (
    <div className={s.card}>
      <div className={s.primary}>
        <div className={s.logo}></div>
        <h2>{p.name}</h2>
      </div>
      <div className={s.occupation}>
        <Tag size="m" label="comela" />
      </div>
      <div className={s.links}>
        <div className={s.link}>
          <span>{p.slug}</span>
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
