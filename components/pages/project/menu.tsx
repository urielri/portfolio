import Option from "components/utils/menu/option";
import { useRouter } from "next/router";
import Arrow from "icons/interactive/arrow";
import { FC } from "react";
import {  Share } from "icons/interactive";

 const Options: FC = () => {
  const router = useRouter();
  const back = () => {
    router.back();
  };
  return (
    <>
      <Option
        label={"Volver al inicio"}
        icon={<Arrow rotate={90} size={12} />}
        action={() => back()}
      />
      <Option label={"Compartir"} icon={<Share />} action={() => back()} />
    </>
  );
};

export default Options