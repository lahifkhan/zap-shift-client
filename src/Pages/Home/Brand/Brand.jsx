import React from "react";
import Marquee from "react-fast-marquee";
import brand1 from "../../../assets/brands/amazon.png";
import brand2 from "../../../assets/brands/casio.png";
import brand3 from "../../../assets/brands/moonstar.png";
import brand4 from "../../../assets/brands/randstad.png";
import brand5 from "../../../assets/brands/star.png";
import brand6 from "../../../assets/brands/start_people.png";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

const Brand = () => {
  return (
    <div className="my-24">
      <h1 className="text-secondary font-bold text-center mb-8 text-3xl">
        We've helped thousands of,sales teams
      </h1>
      <Marquee autoFill={true} gradient={true} gradientColor="#03373d">
        {brands.map((brand) => (
          <div className=" p-4">
            <img src={brand} alt="" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brand;
