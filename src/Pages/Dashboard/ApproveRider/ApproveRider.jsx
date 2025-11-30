import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { IoPersonRemove } from "react-icons/io5";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaRegEye, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const modalref = useRef();
  const [rider, setRider] = useState(null);

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["rider", "status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider");
      console.log(res);
      return res.data;
    },
  });

  const updateRiderInfo = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };

    axiosSecure.patch(`/rider/${rider._id}`, updateInfo).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: `Your rider status set to has ${status}.`,
          icon: "success",
        });

        refetch();
      }
    });
  };

  const handleApprove = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRiderInfo(rider, "approve");
      }
    });
  };

  const handleReject = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRiderInfo(rider, "reject");
      }
    });
  };

  const handleView = (rider) => {
    modalref.current.showModal();
    setRider(rider);
  };
  return (
    <div>
      <p>Approve rider {riders.length}</p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td
                  className={`${
                    rider.status === "approve" && "text-green-400"
                  } ${rider.status === "reject" && "text-red-500"}`}
                >
                  {rider.status}
                </td>
                <td className="space-x-1">
                  <button onClick={() => handleView(rider)} className="btn">
                    <FaRegEye />
                  </button>
                  <button onClick={() => handleReject(rider)} className="btn">
                    <IoPersonRemove color="red" />
                  </button>

                  <button onClick={() => handleApprove(rider)} className="btn">
                    <IoPersonAddSharp color="green" />
                  </button>

                  <button className="btn">
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={modalref}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form className="mt-12 p-4 text-black">
            {/* two column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* rider Details */}

              <fieldset className="fieldset">
                <h4 className="text-2xl font-semibold">Rider Details</h4>
                {/* rider name */}
                <label className="label">Rider Name</label>
                <input
                  type="text"
                  defaultValue={rider?.name}
                  className="input w-full"
                  placeholder="Sender Name"
                />

                {/* rider email */}
                <label className="label">Email</label>
                <input
                  type="text"
                  defaultValue={rider?.email}
                  className="input w-full"
                  placeholder="Sender Email"
                />

                <label className="label">Region</label>
                <input
                  type="text"
                  defaultValue={rider?.region}
                  readOnly
                  className="input w-full"
                  placeholder="rider region"
                />
                <label className="label">District</label>
                <input
                  type="text"
                  defaultValue={rider?.district}
                  readOnly
                  className="input w-full"
                  placeholder="rider district"
                />

                {/* rider address */}
                <label className="label mt-4">Rider Address</label>
                <input
                  type="text"
                  defaultValue={rider?.address}
                  className="input w-full"
                  placeholder="rider Address"
                />
              </fieldset>
              {/* More Details */}
              <fieldset className="fieldset">
                <h4 className="text-2xl font-semibold">More Details</h4>
                {/* rider License */}
                <label className="label">Driving License</label>
                <input
                  type="text"
                  defaultValue={rider?.license}
                  className="input w-full"
                  placeholder="Driving License"
                />

                {/* rider email */}
                <label className="label">NID</label>
                <input
                  type="text"
                  defaultValue={rider?.nid}
                  className="input w-full"
                  placeholder="NID"
                />

                {/* Bike */}
                <label className="label mt-4">BIKE</label>
                <input
                  type="text"
                  defaultValue={rider?.bike}
                  className="input w-full"
                  placeholder="Bike"
                />
                {/*  address */}
              </fieldset>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRider;
