import React from "react";
import logoImg from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logoImg} alt="" />
      <p className="font-bold text-3xl -ms-3">ZapShift</p>
    </div>
  );
};

export default Logo;
