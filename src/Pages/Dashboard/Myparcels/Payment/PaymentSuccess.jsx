import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);

        setPaymentInfo({
          trackingId: res.data.trackingId,
          transactionId: res.data.transactionId,
        });
      });
  }, [axiosSecure, sessionId]);
  return (
    <div>
      <h2 className="text-2xl font-semibold">Payment successfull</h2>
      <p>Tracking Id:{paymentInfo.trackingId}</p>
      <p>Transaction Id:{paymentInfo.transactionId}</p>
    </div>
  );
};

export default PaymentSuccess;
