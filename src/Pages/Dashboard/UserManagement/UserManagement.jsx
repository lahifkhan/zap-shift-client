import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["userManagement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const modifyUserRole = (user, status) => {
    const roleInfo = { role: status };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user/${user._id}`, roleInfo).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Modified!",
              text: `${user.displayName} mark as an ${status}`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleSetAdmin = (user) => {
    modifyUserRole(user, "admin");
  };

  const handleRemoveAdmin = (user) => {
    modifyUserRole(user, "user");
  };
  return (
    <div>
      <p className="text-2xl font-bold">User Management {users.length}</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <th>
                  {user?.role == "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-400"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSetAdmin(user)}
                      className="btn bg-green-400"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
