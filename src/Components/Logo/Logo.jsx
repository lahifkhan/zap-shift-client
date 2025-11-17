import React from "react";
import logoImg from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logoImg} alt="" />
      <Link to={"/"} className="font-bold text-3xl -ms-3">
        ZapShift
      </Link>
    </div>
  );
};

export default Logo;
