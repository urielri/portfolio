import { FC, ReactElement, ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./s.module.css";
interface Props {
  width?: number;
  height?: number;
  bRadius?: number;
  background?: string;
  children?: ReactElement | ReactNode;
  loading: boolean;
  animation: boolean;
}
const Skeleton: FC<Props> = ({
  width,
  height,
  bRadius,
  background,
  loading,
  children,
  animation,
}) => {
  const ref: any = useRef();
  const q = gsap.utils.selector(ref);
  const styles = {
    width: width || 300,
    height: height || 24,
   borderRadius: bRadius || 12,
    background: background || "var(--surface3)",
  };
   useEffect(() => {
    if (animation) {
      if (loading) {
        const t = gsap.fromTo(
          q("#animation"),
          { left: -100 },
          {
            duration: 1.4,
            delay: 0.3,
            repeat: 999,
            translateX: width ? width : 300,
          }
        );
        return () => {
          t.kill();
        };
      } else {
        const t: any = gsap.fromTo(
          q("#loaded"),
          { left: 0, opacity: 0 },
          {
            duration: 0.3,
            opacity: 1,
          }
        );
        return () => {
          t.kill();
        };
      }
    }
  }, [loading, animation]);
 
   return (
      <div className={s.c} ref={ref}>
        <div className={s.sk} style={styles}>
          <div className={s.animation} id="animation"></div>
        </div>
      </div>
    );
};
export default Skeleton;
