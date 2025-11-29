import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import useAuth from "../../../Hook/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut, setUser, setloading } = useAuth();
  const links = (
    <>
      <li className="text-accent">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="text-accent">
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li className="text-accent">
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>

      <li className="text-accent">
        <NavLink to={"/"}>About Us</NavLink>
      </li>
      {user && (
        <>
          <li className="text-accent">
            <NavLink to={"/parcels"}>Add Parcels</NavLink>
          </li>

          <li className="text-accent">
            <NavLink to={"/dashboard/myParcels"}>My Parcels</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        setloading(false);
        toast.success("Log out successfully");
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="btn btn-ghost text-xl">
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-2">
        {user ? (
          <div>
            <button onClick={handleLogOut} className="btn text-accent">
              Log Out
            </button>
          </div>
        ) : (
          <Link to={"/login"} className="btn text-accent">
            Sign in
          </Link>
        )}
        <Link to={"/rider"} className="btn btn-primary text-black">
          Be a rider
        </Link>
        <BsArrowUpRightCircleFill size={40} />
      </div>
    </div>
  );
};

export default Navbar;
