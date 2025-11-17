import React from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, profileUpdate } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const registerSubmit = (data) => {
    console.log(data);

    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);

        // conver photo to form data
        const formData = new FormData();
        formData.append("image", profileImg);
        // img api url
        const img_api_url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(img_api_url, formData).then((res) => {
          console.log(res.data.data.display_url);
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          profileUpdate(userProfile)
            .then(() => {
              console.log("profile update done");
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.code);
            });
        });

        navigate(location?.state || "/");
        toast.success("Account created successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code);
      });
  };
  return (
    <div>
      <div className="card w-full max-w-md shrink-0 md:ml-8">
        <div className="card-body ">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p>Register with ZapShift</p>
          <form onSubmit={handleSubmit(registerSubmit)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label text-black">Name</label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                className="input w-full"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name must required</p>
              )}

              <label className="label text-black">Photo</label>
              <input
                type="file"
                name="phot"
                {...register("photo", { required: true })}
                className="file-input w-full"
                placeholder="Name"
              />

              {errors.photo?.type === "required" && (
                <p className="text-red-500">Name must required</p>
              )}

              {/* email */}
              <label className="label text-black">Email</label>
              <input
                type="email"
                className="input w-full"
                name="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500">Email must be required</p>
              )}

              {/* password */}
              <label className="label text-black">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                })}
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password must be required</p>
              )}

              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be 6 characters and one uppercase and lowercase
                  letter
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <div className="w-full">
                <button className="btn btn-primary text-black w-full mt-4">
                  Register
                </button>
              </div>
            </fieldset>
          </form>
          <p>
            Already have an account?
            <Link to={"/login"} className="text-blue-500">
              Log In
            </Link>{" "}
          </p>

          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
