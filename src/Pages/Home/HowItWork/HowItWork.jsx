import React from "react";
import bokingImg from "../../../assets/bookingIcon.png";

const HowItWork = () => {
  const works = [
    {
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },

    {
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },

    {
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="my-24">
      <h1 className="text-secondary font-bold text-3xl mb-8">How It Work</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {works.map((work) => (
          <div className="bg-base-100 rounded-2xl space-y-2 shadow-5xl p-4">
            <img src={bokingImg} alt="" />
            <h1 className="text-xl font-bold text-secondary">{work.title}</h1>
            <p className="text-accent">{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
