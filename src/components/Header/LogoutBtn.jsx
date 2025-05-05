import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as storeLogout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(storeLogout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2.5 rounded-xl font-medium bg-white/50 text-indigo-700 border border-white/30 backdrop-blur-md shadow-sm hover:bg-red-100/60 hover:text-red-800 hover:shadow-md transition-all duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
