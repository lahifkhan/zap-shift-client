import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const Parcels = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  console.log(user);

  const [stores, setStores] = useState([]);
  const [loading, setloading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStores(data);
        setloading(false);
      });
  }, []);

  const regionsDuplicate = stores.map((st) => st.region);
  const regions = [...new Set(regionsDuplicate)];
  console.log(regions);

  const handleDistrict = (region) => {
    const regionDistricts = stores.filter((st) => st.region === region);
    const districts = regionDistricts.map((dis) => dis.district);
    console.log("district of region", districts);
    return districts;
  };
  const senderRegion = useWatch({ control, name: "senderRegion" });

  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  if (loading) {
    return <p>loading...</p>;
  }

  handleDistrict(regions[0]);

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const weight = parseFloat(data.parcelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        let minRange = isSameDistrict ? 110 : 150;
        let extraWeigth = weight - 3;
        let extraCharge = isSameDistrict
          ? extraWeigth * 40
          : extraWeigth * 40 + 40;

        cost = minRange + extraCharge;
      }
    }

    console.log(cost);

    Swal.fire({
      title: "Are you sure?",
      text: `Your total cost is ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res.data);
        });
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-secondary">Add Parcel</h1>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="my-12 space-y-7"
      >
        <h1 className="font-bold text-secondary text-2xl">
          Enter your parcel details
        </h1>

        <div className="flex gap-2 ">
          <label className="label">
            <input
              type="radio"
              name="parcelType"
              value={"document"}
              {...register("parcelType")}
              className="radio radio-success"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              name="parcelType"
              className="radio radio-success"
              value={"nonDocument"}
              {...register("parcelType")}
            />
            Non Document
          </label>
        </div>
        {/* parcel name and parcel wigtht */}
        <div className="grid grid-cols-2 gap-8">
          <fieldset className="fieldset">
            <label className="label text-black">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input  w-full"
              placeholder="Parcel Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label text-black">Parcel Weight (KG)</label>
            <input
              type="number"
              className="input  w-full"
              placeholder="Parcel weight"
              {...register("parcelWeight")}
            />
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* sender details */}
          <div>
            <fieldset className="fieldset">
              <h1 className="font-bold text-lg mb-5">Sender Details</h1>
              {/* sender name */}
              <label className="label text-black">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender Name"
              />

              <label className="label text-black">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input  w-full"
                placeholder="Sender Email"
              />

              {/* sender contact No */}
              <label className="label text-black">Sender Contact No</label>
              <input
                type="text"
                {...register("senderContactNo")}
                className="input  w-full"
                placeholder="Sender Contact No"
              />

              {/* sender contact No */}
              <label className="label text-black">Sender Adress</label>
              <input
                type="text"
                {...register("senderAdress")}
                className="input  w-full"
                placeholder="Sender Adress"
              />

              {/* Region */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a color"
                  className="select  w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </fieldset>

              {/* district */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a color"
                  className="select  w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {handleDistrict(senderRegion).map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Pickup instruction</legend>
                <textarea
                  className="textarea h-24  w-full"
                  placeholder="Pickup instruction"
                ></textarea>
              </fieldset>
            </fieldset>
          </div>

          {/* Reciver details */}

          <div>
            <fieldset className="fieldset">
              <h1 className="font-bold text-lg mb-5">Receiver Details</h1>
              {/* Reciever name */}
              <label className="label text-black">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input  w-full"
                placeholder="Receiver Name"
              />

              <label className="label text-black">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input  w-full"
                placeholder="Receiver Email"
              />

              {/*Receiver contact No */}
              <label className="label text-black">Receiver Contact No</label>
              <input
                type="text"
                {...register("receiverContactNo")}
                className="input  w-full"
                placeholder="Receiver Contact No"
              />

              {/* Receiver adress No */}
              <label className="label text-black">Receiver Adress</label>
              <input
                type="text"
                {...register("receiverAdress")}
                className="input  w-full"
                placeholder="Receiver Adress"
              />

              {/* Region */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a Region"
                  className="select  w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </fieldset>

              {/* district */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver District</legend>
                <select
                  defaultValue="Pick a District"
                  className="select  w-full"
                  {...register("receiverDistrict")}
                >
                  <option disabled={true}>Pick a District</option>
                  {handleDistrict(receiverRegion).map((r, i) => (
                    <option key={i}>{r}</option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Pickup instruction</legend>
                <textarea
                  className="textarea h-24  w-full"
                  placeholder="Pickup instruction"
                ></textarea>
              </fieldset>
            </fieldset>
          </div>
        </div>

        <p>PickUp Time 4pm-7pm Approx.</p>

        <button className="btn btn-primary text-black">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Parcels;
