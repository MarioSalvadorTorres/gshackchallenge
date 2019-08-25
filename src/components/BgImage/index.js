import React from "react";
import imagen from "./foto.jpg";

const BgImage = () => {
  return (
    <div className="interactiveImage">
      <img src={imagen} alt="tu imagen" />
    </div>
  );
};

export default BgImage;
