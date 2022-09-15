import { FC } from "react";
import s from "./s.module.css";
interface Props {
  label: string;
  size: "s" | "m" | "l";
}
const Tag: FC<Props> = ({ label, size }) => {
  const styleSize: any =
    size === "s" ? s.s : size === "m" ? s.m : size === "l" ? s.l : "";
  return (
    <div className={`${s.tag} ${styleSize}`}>
      <span>{label}</span>
    </div>
  );
};
export default Tag;
