import { FC, ReactElement } from "react";
import s from "./s.module.css";
interface Props {
  label: string;
  icon: JSX.Element | ReactElement;
  active?: boolean;
  action: Function;
}
const Option: FC<Props> = ({ label, icon, active, action }) => {
  const styleActive = active ? s.active : '';
  const act = () => {
    action();
  };
  return (
    <div
      className={`${s.option} ${styleActive}`}
      title={label}
      onClick={() => act()}
    >
      <div className={s.icon}>{icon}</div>
    </div>
  );
};
export default Option;
