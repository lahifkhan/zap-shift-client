import React from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";

const Register = () => {
  return (
    <div>
      <div className="card w-full max-w-md shrink-0 md:ml-8">
        <div className="card-body ">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p>Register with ZapShift</p>
          <fieldset className="fieldset">
            {/* name */}
            <label className="label text-black">Name</label>
            <input type="text" className="input w-full" placeholder="Name" />

            {/* email */}
            <label className="label text-black">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
            />

            {/* password */}
            <label className="label text-black">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              name="password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div className="w-full">
              <button className="btn btn-primary text-black w-full mt-4">
                Login
              </button>
            </div>
          </fieldset>
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
