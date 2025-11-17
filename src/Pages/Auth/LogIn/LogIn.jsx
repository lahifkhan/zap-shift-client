import React from "react";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const LogIn = () => {
  return (
    <div>
      <div className="card w-full max-w-md shrink-0 md:ml-8">
        <div className="card-body ">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p>Login with ZapShift</p>
          <fieldset className="fieldset">
            <label className="label text-black">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />
            <label className="label text-black">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
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
            Don’t have any account?{" "}
            <Link to={"/register"} className="text-blue-500">
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
