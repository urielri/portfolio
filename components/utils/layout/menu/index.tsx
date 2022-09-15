import Option from "components/utils/menu/option";
import {
  Arrow,
  ColorPalette,
  Contrast,
  Logo,
  Moon,
  Sun,
} from "icons/interactive";
import { Behance, Dribbble, Github, LinkedIn } from "icons/social";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import s from "./s.module.css";
import { useRecoilState } from "recoil";
import { theme as themeAtom } from "atoms";
import gsap from "gsap";
interface Props {
  children: ReactNode;
}

const Menu: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [palette, setPalette] = useState(false);
  const themeRef: any = useRef();
  const q = gsap.utils.selector(themeRef);
  const tl: any = useRef();
  const changeTheme = (val: "os" | "light" | "dark") => {
    setPalette(false);

    const doc = document.firstElementChild;
    doc && doc.setAttribute("color-scheme", val);
    localStorage.setItem("theme", val);

    setTheme(val);
  };
  useEffect(() => {
    if (palette) {
      tl.current = gsap
        .timeline()
        .to(q("#toggle"), { duration: 0.1, rotate: -45 })
        .to(themeRef.current, {
          duration: 0.1,
          background: "var(--grey)",
          position: "static",
        })
        .to(q("#variants"), { duration: 0.1, height: 88, rowGap: "12px" });
    } else {
      tl.current = gsap
        .timeline()
        .to(q("#toggle"), { duration: 0.1, rotate: 0 })
        .to(themeRef.current, {
          duration: 0.1,
          background: "transparent",
          position: "relative",
        })
        .to(q("#variants"), { duration: 0.1, height: 0 });
    }
  }, [palette]);

  return (
    <div className={s.menu}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.options}>{children}</div>
      <div className={s.social}>
        <Option
          label="LinkedIn"
          action={() => console.log("redirect")}
          icon={<LinkedIn />}
        />
        <Option
          label="Behance"
          action={() => console.log("redirect")}
          icon={<Behance />}
        />
        <Option
          label="Github"
          action={() => console.log("redirect")}
          icon={<Github />}
        />
        <Option
          label="Dribbble"
          action={() => console.log("redirect")}
          icon={<Dribbble />}
        />
        <Arrow />
      </div>
      <div className={s.theme} ref={themeRef} id="box">
        <div className={s.variants} id="variants">
          {theme !== "light" && (
            <div
              className={s.variant}
              id="light"
              onClick={() => changeTheme("light")}
            >
              <Sun />
            </div>
          )}
          {theme !== "dark" && (
            <div
              className={s.variant}
              id="dark"
              onClick={() => changeTheme("dark")}
            >
              {" "}
              <Moon />
            </div>
          )}
          {theme !== "os" && (
            <div
              className={s.variant}
              id="os"
              onClick={() => changeTheme("os")}
            >
              <Contrast />
            </div>
          )}
        </div>
        <div
          className={s.toggle}
          id="toggle"
          onClick={() => setPalette((palette) => !palette)}
        >
          <ColorPalette />
        </div>
      </div>
    </div>
  );
};
export default Menu;
