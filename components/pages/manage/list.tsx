import { FC } from "react";
import s from "./s.module.css";
import Card from "components/utils/cards/general";
import useSWR from "swr";
import { _Resource } from "interface";
import { get } from "service";
import { section as sectionAtom } from "atoms";
import { useRecoilValue } from "recoil";
const List: FC<{ section: string }> = () => {
  const section = useRecoilValue(sectionAtom);
  const { data } = useSWR(
    section ?`/${section}`: null,
    (e: any) => get<_Resource[]>(e, section),
    { suspense: false }
  );
  return (
    <div className={s.list}>
      {data?.data.map((res) => (
        <Card
          key={res._id}
          icon={res.icon}
          name={res.name}
          link={res.link}
          _id={res._id}
          loading={data.loading}
        />
      ))}
    </div>
  );
};

export default List;
