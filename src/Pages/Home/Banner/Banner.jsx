import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
const Banner = () => {
  return (
    <div className=" relative my-5">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="">
          <img src={bannerImg1} />
        </div>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>
      <div className="absolute bottom-18 left-4 md:bottom-35 md:left-20 z-50 flex items-center">
        <button className="btn btn-xs md:btn-md btn-primary text-black ">
          Track your Parcel
        </button>
        <BsArrowUpRightCircleFill className="text-2xl md:text-4xl" />
        <button className="ml-4 btn btn-xs md:btn-md ">Be A Rider</button>
      </div>
    </div>
  );
};

export default Banner;
