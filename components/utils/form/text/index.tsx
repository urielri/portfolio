import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import s from "./s.module.css";

type I = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id?: string;
  name?: string;
  onClick?: Function;
  onChange?: Function;
};
const Text: FC<I> = ({ ...props }) => {
  return (
    <div className={s.text}>
      <input
        type="text"
        name={props.name}
        value={props.value}
        id={props.id}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
        
      />
    </div>
  );
};

export default Text;
