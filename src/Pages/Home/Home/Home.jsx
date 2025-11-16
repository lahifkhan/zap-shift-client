import React from "react";
import Banner from "../Banner/Banner";
import HowItWork from "../HowItWork/HowItWork";
import OurService from "../Services/OurService";
import Brand from "../Brand/Brand";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto ">
      <Banner></Banner>
      <HowItWork></HowItWork>
      <OurService></OurService>
      <Brand></Brand>
    </div>
  );
};

export default Home;
