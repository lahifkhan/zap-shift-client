import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h2>Payment is canceled, Please try again</h2>
      <Link to={"/dashboard/myParcels"} className="btn btn-primary text-black">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancel;
