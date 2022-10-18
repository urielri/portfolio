import { FC } from "react";
import s from "./s.module.css";
import { CardPrev } from "components/utils/cards/project";
const Prev: FC = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className={s.list}>
      {arr.map((v) => (
        <CardPrev key={v} />
      ))}
    </div>
  );
};

export default Prev;
