import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payment", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <h2>Payment History {payments.length} </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th> Transaction Id </th>
              <th> Paid At </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.parcelName}</td>
                <td>${payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.paidAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
