import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hook/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LogIn = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        toast.success("Successfully Log in");

        navigate(location?.state || "/");
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
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p>Login with ZapShift</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label text-black">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                name="email"
                {...register("email", { required: true })}
              />

              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}

              {/* email */}
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
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer and one upperCase and
                  lowerCase
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <div className="w-full">
                <button className="btn btn-primary text-black w-full mt-4">
                  Login
                </button>
              </div>
            </fieldset>
          </form>
          <p>
            Don’t have any account?{" "}
            <Link
              state={location.state}
              to={"/register"}
              className="text-blue-500"
            >
              Register
            </Link>{" "}
          </p>

          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
