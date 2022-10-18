import { FC, useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import s from "./s.module.css";
import gsap from "gsap";
import { Box } from "icons/interactive";

Modal.setAppElement("#__next");

const Menu: FC = () => {
  const [menu, setMenu] = useState("");
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);
  useEffect(() => {
    if (menu === "open") {
      gsap.timeline().to(q("#icon"), { duration: 0.1, opacity: 0, display: 'none' });
    }
    if (menu === "close") {
      gsap.timeline().to(q("#icon"), { duration: 0.1, opacity: 1, delay: 0.2, display: 'grid' })
    }
  }, [menu]);
  return (
    <Modal
      isOpen={true}
      className={s.accessibility}
      overlayClassName={`${s.overlay} ${
        menu === "open" ? s.active : menu === "close" ? s.close : null
      }`}
      id="modal"
    >
      <div className={s.menu} ref={ref}>
        <div className={s.icon} onClick={() => setMenu("open")} id="icon">
          <Box/>
        </div>
        <div className={s.content}>
          <div onClick={() => setMenu("close")} className={s.head}>
            cerrar
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Menu;
