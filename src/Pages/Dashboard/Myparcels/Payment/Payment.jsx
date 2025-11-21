import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(parcelId);

  const { data: parcel, isPending } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${parcelId}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel.parcelId,
      parcelName: parcel?.parcelName,
      senderEmail: parcel.senderEmail,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data.url);
    window.location.href = res.data.url;
  };

  if (isPending) return <p>loading....</p>;
  return (
    <div>
      <h1>pay for {parcel?.parcelName}</h1>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
