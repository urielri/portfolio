import { FC, ReactElement, ReactNode } from "react";
import s from "./s.module.css";
interface Props {
  id: string;
  children: ReactElement | ReactNode;
  text: string
}
const Label: FC<Props> = ({ id, children, text }) => {
  return (
    <label htmlFor={id} className={s.label}>
      <span>
        {text}
      </span>
      {children}
    </label>
  );
};
export default Label;
