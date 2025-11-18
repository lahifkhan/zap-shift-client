import React, { useEffect, useState } from "react";
import serviceImg from "../../../assets/service.png";

const OurService = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(data);
      });
  }, []);
  return (
    <div className="text-center bg-secondary p-24 rounded-2xl space-y-5">
      <div className="">
        <h1 className="text-white font-bold text-3xl mb-4">Our Services</h1>
        <p className="text-[#dadada] font-semibold">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br />
          business shipments — we deliver on time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div className="bg-base-100 rounded-2xl space-y-2 shadow-5xl p-4 hover:bg-primary flex flex-col justify-center items-center">
            <img src={serviceImg} alt="" />
            <h1 className="text-xl font-bold text-secondary">
              {service.title}
            </h1>
            <p className="text-accent">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
