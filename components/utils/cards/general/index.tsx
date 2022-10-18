import { _Resource } from "interface";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import s from "./s.module.css";
import { resource as resourceAtom } from "atoms";
import { useRecoilState } from "recoil";
import Skeleton from "components/utils/skeleton";
import gsap from "gsap";
import { Label, Text } from "components/utils/form";
import { Trash, Edit } from "icons/interactive";
import { useAggregate, useDelete, useForm, useModify } from "hooks";
interface Props extends _Resource {
  loading: boolean;
}
const Card: FC<Props> = ({ icon, name, link, loading, _id }) => {
  const [resource, setResource] = useRecoilState(resourceAtom(_id || ""));
  const [open, setOpen] = useState("");
  const [asRemove, setRemove] = useState(false);
  const ref: any = useRef(null);
  const q = gsap.utils.selector(ref);
  const f = useForm({ name, icon, link, _id });
  const modify = useModify(
    { submit: f.submit, values: { ...f.values } },
    "resource",
    `/resource/${_id}`
  );
  // const aggregate = useAggregate<_Resource, any>(f, "resource", "/resource");
  const remove = useDelete("resource", `/resource/${_id}`, asRemove);
  useEffect(() => {
    !loading && setResource({ icon, name, link, _id });
  }, [loading]);
 
  useEffect(() => {
    let position = window.innerHeight - ref?.current?.offsetTop;
    const b = 200;
    const t = window.innerHeight - 200;
    let move =
      position > b && position < t ? "-50%" : position < b ? "-314px" : 0;
    console.log({
      position,
      window: window.innerHeight,
      c: document.body.clientHeight,
    });
    if (open === "open") {
      gsap.to(q("#expand"), {
        duration: 0.2,
        backgroundColor: "var(--white)",
        transform: `translateY(${move})`,
        borderRadius: 24,
        boxShadow: "0px 8px 16px 0px hsla(29, 26%, 10%, 0.12)",
        cursor: "inherit",
        zIndex: 5,
        height: 480,
      });
      gsap
        .timeline()
        .to(q("#content"), { duration: 0.1, display: "flex", height: "100%" })
        .to(q("#content"), { duration: 0.1, opacity: 1 });
    }
    if (open === "close") {
      gsap.to(q("#expand"), {
        duration: 0.2,
        backgroundColor: "var(--white-b)",
        height: 110,
        cursor: "pointer",
        zIndex: 1,
        boxShadow: "none",
        transform: "translateY(0)",
      });
      gsap
        .timeline()
        .to(q("#content"), { duration: 0.1, opacity: 0 })
        .to(q("#content"), {
          duration: 0.1,
          display: "none",
          height: "0",
        });
    }
  }, [open]);
  useEffect(() => {
    if (f.submit && modify.loading) {
      gsap.to(q("#form"), {
        duration: 0.2,
        filter: "opacity(0.2)",
      });
    }
    if (f.submit && !modify.loading) {
      gsap.to(q("#form"), {
        duration: 0.2,
        filter: "opacity(1)",
      });
    }
  }, [f.submit]);
   const expand = () => {
     open !== "open" && setOpen("open");
   };
  const edit = () => {
    f.setSubmit(true);
  };
  const confirmDelete = (val: string) => {
    if (val === "") {
      gsap.to(q("#confirm"), { duration: 0.3, opacity: 1, display: "flex" });
    }
    if (val === "yes") {
      setRemove(true);

      gsap.to(q("#confirm"), { duration: 0.3, opacity: 0, display: "none" });
    }
    if (val === "no") {
      gsap.to(q("#confirm"), { duration: 0.3, opacity: 0, display: "none" });
    }
  };
  if (loading) {
    return <Prev />;
  } else {
    return (
      <div className={s.card} ref={ref}>
        {open === "open" && (
          <div className={s.empty} onClick={() => setOpen("close")}></div>
        )}
        <div className={s.presentation} onClick={() => expand()} id="expand">
          <div className={s.head}>
            <div
              className={s.icon}
              style={{ backgroundColor: loading ? resource?.icon.color : "" }}
            >
              {resource?.icon.link && (
                <Image
                  src={resource.icon.link}
                  layout="fixed"
                  width={40}
                  height={40}
                  alt={icon.alt}
                />
              )}
            </div>
            <h2>{resource?.name}</h2>
          </div>
          <div className={s.content} id="content">
            <div className={s.form} id="form">
              <form>
                <Label id={"icon"} text={"Icono"}>
                  <Text placeholder="icon...." />
                </Label>
                <Label id={"link"} text={"Link"}>
                  <Text
                    placeholder="link..."
                    value={f.values?.link}
                    disabled={f.submit}
                    name={"link"}
                    onChange={(e) => f.setValue(e)}
                  />
                </Label>
                <Label id={"name"} text={"Nombre"}>
                  <Text
                    placeholder="nombre..."
                    value={f.values?.name}
                    disabled={f.submit}
                    name={"name"}
                    onChange={(e) => f.setValue(e)}
                  />
                </Label>
              </form>
            </div>
            <div className={s.actions}>
              <div className={s.confirm} id="confirm">
                <span className={s.text}>Esta accion no puede deshacerse</span>
                <div className={s.options}>
                  <div
                    className={s.option}
                    onClick={() => confirmDelete("yes")}
                  >
                    <span>Continuar</span>
                  </div>
                  <div className={s.option} onClick={() => confirmDelete("no")}>
                    <span>Cancelar</span>
                  </div>
                </div>
              </div>
              <div className={s.action} onClick={() => confirmDelete("")}>
                <div className={s.icon}>
                  {asRemove ? (
                    <Spin
                      code={remove.code}
                      loading={remove.loading}
                      messages={{ ok: "Guardado", error: "Reintentar" }}
                    />
                  ) : (
                    <Trash />
                  )}
                </div>
              </div>
              <div className={s.action} onClick={() => edit()}>
                <div className={s.icon}>
                  {f.submit ? (
                    <Spin
                      code={modify.code}
                      loading={modify.loading}
                      messages={{ ok: "Guardado", error: "Reintentar" }}
                    />
                  ) : (
                    <Edit />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
const Spin: FC<{
  code: number | undefined;
  loading: boolean;
  messages: { ok: string; error: string };
}> = ({ code, messages, loading }) => {
  const ref = useRef(null);
  const q = gsap.utils.selector(ref);

  useEffect(() => {
    if (!loading) {
      if (code === 200) {
        gsap.to(ref.current, {
          transform: "scale(1)",
          width: "auto",
          backgroundColor: "transparent",
          duration: 0.1,
        });
        gsap
          .timeline()
          .to(q("#circle"), { backgroundColor: "green", duration: 0.2 })
          .to(q("#circle"), {
            transform: "translate(-50%, -50%) scale(5)",
            duration: 0.2,
          })
          .to(q("#message"), { duration: 0.1, opacity: 1 });
      }
      if (code !== 200) {
        gsap.to(ref.current, {
          transform: "scale(1)",
          width: "auto",
          backgroundColor: "transparent",
          duration: 0.1,
        });
        gsap
          .timeline()
          .to(q("#circle"), { backgroundColor: "red", duration: 0.2 })
          .to(q("#circle"), {
            transform: "translate(-50%, -50%) scale(5)",
            duration: 0.2,
          })
          .to(q("#message"), { duration: 0.1, opacity: 1 });
      }
    } else {
      const a = gsap.fromTo(
        ref.current,
        {
          backgroundColor: "#eff0f0",
          borderRadius: 1000,
          width: 60,
          height: 60,
          transform: "scale(0.8)",
        },
        {
          repeat: -1,
          duration: 1.3,
          repeatDelay: 0.1,
          yoyo: true,
          transform: "scale(3)",
        }
      );
      const b = gsap.fromTo(
        q("#circle"),
        {
          backgroundColor: "#ebebeb",
          borderRadius: 1000,
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%) scale(0.4)",
        },
        {
          repeat: -1,
          duration: 0.6,
          repeatDelay: 0.1,
          yoyo: true,
          ease: "slow(0.7, 0.7, false)",
          transform: "translate(-50%, -50%) scale(1.4)",
        }
      );
      return () => {
        a.kill();
        b.kill();
      };
    }
  }, [loading]);
  return (
    <div className={s.spin} ref={ref}>
      <div className={s.circle} id="circle"></div>
      {code === 200 ? (
        <span id="message">{messages.ok}</span>
      ) : (
        code !== 200 && code && <span id="message">{messages.error}</span>
      )}
    </div>
  );
};
const Prev: FC = () => {
  return (
    <div className={s.card}>
      <div className={s.presentation}>
        <div className={s.icon}>
          <Skeleton
            loading={true}
            animation={true}
            width={60}
            height={60}
            bRadius={100}
          />
        </div>
        <Skeleton
          loading={true}
          animation={true}
          width={200}
          height={36}
          bRadius={12}
        />
      </div>
    </div>
  );
};
export default Card;
