import React, { useEffect, useState } from "react";
import custormerTop from "../../../assets/customer-top.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import ReviewCard from "./ReviewCard";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
        setReady(true);
      });
  }, []);
  return (
    <div className="mb-32">
      <div className="flex flex-col justify-center items-center mb-10">
        <img src={custormerTop} alt="" />
        <h1 className="text-secondary text-3xl mb-2 font-bold mt-10">
          What our customers are sayings
        </h1>
        <p className="text-accent text-center ">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain,
          <br /> and strengthen your body with ease!
        </p>
      </div>

      {ready && (
        <Swiper
          effect={"coverflow"}
          loop={true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            scale: 0.75,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Reviews;
