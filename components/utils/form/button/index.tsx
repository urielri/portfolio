import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactElement,
  ReactNode,
} from "react";
import s from "./s.module.css";
type I = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: "s" | "m";
};
const Button: FC<I> = ({ ...props }) => {
  return (
    <div className={s.button}>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
      >
        {props.children}
      </button>
    </div>
  );
};
export default Button;
