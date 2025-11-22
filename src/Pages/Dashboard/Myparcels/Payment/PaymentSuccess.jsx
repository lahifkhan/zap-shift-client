import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    axiosSecure.patch(`/update-payment-status/${sessionId}`).then((res) => {
      console.log(res.data);
    });
  }, [axiosSecure, sessionId]);
  return (
    <div>
      <h2>Payment successfull</h2>
    </div>
  );
};

export default PaymentSuccess;
