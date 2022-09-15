import { FC, ReactNode, useEffect } from "react";
import s from "./s.module.css";
import Menu from "./menu";
import { useSetRecoilState } from "recoil";
import { theme as themeAtom } from "atoms";
interface Props {
  children: ReactNode;
  menu: ReactNode;
}
const Layout: FC<Props> = ({ children, menu }) => {
  const setTheme = useSetRecoilState(themeAtom);
  useEffect(() => {
    if (
      localStorage.getItem("theme") &&
      localStorage.getItem("theme") !== "os"
    ) {
      const theme: "os" | "light" | "dark" = localStorage.getItem("theme")
        ? localStorage.getItem("theme") === "light"
          ? "light"
          : "dark"
        : "os";
        const doc = document.firstElementChild;
      console.log(doc);
      doc && doc.setAttribute("color-scheme", theme);
     // localStorage.setItem("theme", theme);
      setTheme(theme);
    } 
  }, []);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Menu>{menu}</Menu>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
