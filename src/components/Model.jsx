import React from "react";
import { useGSAP } from "@gsap/react";

const Model = () => {
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);
  return (
    <div className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a close look.
        </h1>
      </div>
    </div>
  );
};

export default Model;
