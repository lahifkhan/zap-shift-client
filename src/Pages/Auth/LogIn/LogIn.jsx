import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hook/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LogIn = () => {
  const { signInUser, signGoogle, setUser, setloading } = useAuth();
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

  const handleGoogleSign = () => {
    signGoogle()
      .then((res) => {
        toast.success("Accounts Loged In Successfully");
        setUser(res.user);
        setloading(false);
        console.log(res.user);
        {
          location.state ? navigate(location.state) : navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.code);
        toast.error(err.code);
        setloading(false);
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

          <button
            onClick={handleGoogleSign}
            className="btn btn-md w-full bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="26"
              height="26"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
