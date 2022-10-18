import s from "./s.module.css";
import { FC, useState, useEffect } from "react";
import { Label, Text, Button, TextArea } from "components/utils/form";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { newModal as newAtom } from "atoms";
import { Close, Trash } from "icons/interactive";
import { useForm, useAggregate } from "hooks";
import { _Resource } from "interface";
Modal.setAppElement("#__next");
interface Props {
  name: string;
}
const Forms: FC<Props> = ({ name }) => {
  switch (name) {
    case "media":
      return <FMedia />;
      break;
    case "resources":
      return <FResource />;
      break;
    case "projects":
      return <FProject />;
    default:
      return <FDefault />;
  }
};

const FResource: FC = () => {
  const action = (e: any) => {
    e.preventDefault();
    f.setSubmit(true);
  };
  const f = useForm<_Resource>({
    name: "",
    link: "",
    icon: { color: "#616571", alt: "generic", link: "" },
  });
  const q = useAggregate<boolean, any>(
    {
      values: { ...f.values },
      submit: f.submit,
    },
    "resource",
    "/resource"
  );
  useEffect(() => {
    if (q.status === "ok" && f.submit) {
      f.resetValue();
      f.setSubmit(false);
    }
  }, [q]);
  return (
    <form>
      <Label text="Icono" id="icon">
        <Text placeholder="aca es el seelct" name="icon" />
      </Label>
      <Label text="Link" id="link">
        <Text
          placeholder="Link..."
          name="link"
          value={f.values?.link}
          onChange={(e) => f.setValue(e)}
        />
      </Label>
      <Label text="Nombre" id="name">
        <Text
          placeholder="Nombre..."
          name="name"
          value={f.values?.name}
          onChange={(e) => f.setValue(e)}
        />
      </Label>
      <div>
        <Button onClick={(e) => action(e)}>Crear</Button>
      </div>
    </form>
  );
};

const FMedia: FC = () => {
  const action = (e: any) => {
    e.preventDefault();
  };
  return (
    <form>
      <Label text="Nombre" id="name">
        <Text
          name="name"
          id="name"
          onChange={(e) => console.log(e)}
          placeholder="Nombre..."
        />
      </Label>
      <Label text="Link" id="link">
        <Text
          name="link"
          id="link"
          onChange={(e) => console.log(e)}
          placeholder="Link..."
        />
      </Label>
      <Label text="Alt" id="alt">
        <Text
          name="alt"
          id="alt"
          onChange={(e) => console.log(e)}
          placeholder="Alt..."
        />
      </Label>
      <div>
        <Button onClick={(e) => action(e)}>Crear</Button>
      </div>
    </form>
  );
};

const FProject: FC = () => {
  // const [open, setOpen] = useState(true)
  const [form, setNew] = useRecoilState(newAtom);
  return (
    <Modal isOpen={form} overlayClassName={s.overlay} className={s.modal}>
      <div className={s.content}>
        <div className={s.head}>
          <h1>Crear proyecto</h1>
          <div onClick={() => setNew(false)} className={s.icon}>
            <Close />
          </div>
        </div>
        <div className={s.form}>
          <form>
            <Label text="Nombre" id="">
              <Text placeholder="nombre..." />
            </Label>
            <Label text="Slug" id="">
              <Text placeholder="slug.." />
            </Label>
            <Label text="Descripcion" id="">
              <TextArea name={""} />
            </Label>
            <div className={s.lists}>
              <div className={s.list}>
                <Label text="Links" id="">
                  <Text placeholder="link..." />
                </Label>
                <div className={s.items}>
                  <div className={s.item}>
                    <span>https://github.com/Microsoft</span>
                    <div className={s.icon}>
                      <Trash />
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.list}>
                <Label text="Metodologias" id="">
                  <Text placeholder="metodologia..." />
                </Label>
                <div className={s.items}></div>
              </div>
            </div>
            <div className={s.lists}>
              <div className={s.list}>
                <Label text="Ocupaciones" id="">
                  <Text placeholder="ocupacion..." />
                </Label>
                <div className={s.items}>
                  <div className={s.item}>
                    <span>https://github.com/Microsoft</span>
                    <div className={s.icon}>
                      <Trash />
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.list}>
                <Label text="Herramientas" id="">
                  <Text placeholder="herramienta..." />
                </Label>
                <div className={s.items}>
                  <div className={s.item}>
                    <span>https://github.com/Microsoft</span>
                    <div className={s.icon}>
                      <Trash />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.lists}>
              <div className={s.list}>
                <Label text="Desde" id="">
                  <Text placeholder="desde..." />
                </Label>
              </div>
              <div className={s.list}>
                <Label text="Hasta" id="">
                  <Text placeholder="hasta..." />
                </Label>
              </div>
            </div>
            <div>
              <Label id="resource" text="Recursos">
                <></>
              </Label>
            </div>
            <div>
              <Button>Crear</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
const FDefault: FC = () => {
  return <div>Ups, no pudimos encontrar lo que buscabas {`:(`}</div>;
};
export default Forms;
