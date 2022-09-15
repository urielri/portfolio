import gsap from "gsap";
import { useEffect } from "react";
import { CaseBroken, CaseFilled } from "./case";
import { FireBroken, FireFilled } from "./fire";
import { StarBroken, StarFilled } from "./star";
interface Props {
  view: "broken" | "filled";
}
export function Case(props: Props): JSX.Element {
  const { view } = props;
  useEffect(() => {
    if (view !== "broken") {
      gsap.to(".filled", { duration: 0.1, opacity: 1 });
    } else {
      gsap.to(".filled", { duration: 0.1, opacity: 0 });
    }
  }, [view]);
  return (
    <>
      <div className="i">
        <CaseBroken id="broken" />
        <div className="filled">
          <CaseFilled id="filled" />
        </div>
      </div>
      <style jsx>
        {`
          .i {
            position: relative;
          }
          .filled {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
          }
        `}
      </style>
    </>
  );
}
export function Star(props: Props): JSX.Element {
  const { view } = props;

  useEffect(() => {
    if (view !== "broken") {
      gsap.to(".filleds", { duration: 0.1, opacity: 1 });
    } else {
      gsap.to(".filleds", { duration: 0.1, opacity: 0 });
    }
  }, [view]);
  return (
    <>
      <div className="i">
        <StarBroken id="brokens" />
        <div className="filleds">
          <StarFilled id="filleds" />
        </div>
      </div>
      <style jsx>
        {`
          .i {
            position: relative;
          }
          .filleds {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
          }
        `}
      </style>
    </>
  );
}
export function Fire(props: Props): JSX.Element {
  const { view } = props;

  useEffect(() => {
    if (view !== "broken") {
      gsap.to(".filledf", { duration: 0.1, opacity: 1 });
    } else {
      gsap.to(".filledf", { duration: 0.1, opacity: 0 });
    }
  }, [view]);
  return (
    <>
      <div className="i">
        <FireBroken id="brokenf" />
        <div className="filledf">
          <FireFilled id="filledf" />
        </div>
      </div>
      <style jsx>
        {`
          .i {
            position: relative;
          }
          .filledf {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
          }
        `}
      </style>
    </>
  );
}
