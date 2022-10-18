import { Case, Star, Fire } from "icons/interactive/status";
import { useRouter } from "next/router"; 
import { FC } from "react";
import Option from "components/utils/menu/option";
 const Options: FC = () => {
  const router = useRouter();
  return (
    <>
      <Option
        icon={<Case view={router.asPath === "/" ? "filled" : "broken"} />}
        label="Proyectos"
        action={() => console.log("a")}
        active={router.asPath === "/" && true}
      />
      <Option
        icon={<Star view={router.asPath === "/p" ? "filled" : "broken"} />}
        label="Propios"
        action={() => console.log("a")}
        active={router.asPath === "/p" && true}
      />
      <Option
        icon={<Fire view={router.asPath === "/ps" ? "filled" : "broken"} />}
        label="Propios"
        action={() => console.log("a")}
        active={router.asPath === "/ps" && true}
      />
    </>
  );
};

export default Options