import React from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Myparcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isPending) {
    return <p>loading....</p>;
  }

  const handlePayment = async (parcel) => {
    const parcelInfo = {
      parcelName: parcel.parcelName,
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
    };
    console.log(parcelInfo);
    const res = await axiosSecure.post("/create-payment-session", parcelInfo);
    console.log(res.data.url);
    window.location.assign(res.data.url);
  };
  return (
    <div>
      <h2 className="text-xl font-bold">My parcels {parcels.length}</h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Cost</th>
                <th>Payment</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="text-green-600  btn">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-primary text-black"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <button>{parcel.deliveryStatus}</button>
                  </td>

                  <td>
                    <div className="space-x-1">
                      <button className="btn btn-sm">
                        {" "}
                        <FaMagnifyingGlass size={12} />
                      </button>
                      <button className="btn btn-sm">
                        <FaEdit size={12} />
                      </button>

                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn btn-sm"
                      >
                        <MdDeleteForever size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myparcels;
