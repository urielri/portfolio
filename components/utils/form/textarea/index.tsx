import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from "react";
import s from './s.module.css'
type i = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: string;
};
const TextArea: FC<i> = ({ ...props }) => {
  return (
    <div className={s.textarea}>
      <textarea
        name={props.name}
        id={props.id}
        cols={props.cols}
        rows={props.rows}
        placeholder={props.placeholder}
        onChange={props.onChange}
      ></textarea>
    </div>
  );
};
export default TextArea