import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfieMenu";
import { useNavigate } from "react-router";
import SearchInput from "../features/search/SearchInput";
import { useUserLoginMutation } from "../features/auth/authApi";

export function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();

  return (
    <div className="bg-orange sticky top-0 z-50">
      {/* Navbar: Login and Signup */}
      <div className="flex flex-col items-end">
        <div className="relative pt-2 px-[10%] flex flex-row justify-between items-start font-sans text-white">
          <Typography
            onClick={() => nav("/")}
            as="a"
            href="#"
            className="mr-24 cursor-pointer font-medium"
          >
            OnlineShopNepal
          </Typography>

          <div className="flex flex-row gap-3 items-start text-md">
            <div className="px-3">SAVE MORE ON APP</div>
            <div className="px-3">BECOME A SELLER</div>
            <div className="px-3">HELP AND SUPPORT</div>
            <div className="px-3">
              {user ? (
                <ProfileMenu user={user} />
              ) : (
                <div className="flex flex-row gap-4">
                  <div
                    onClick={() => nav("/login-page")}
                    className="cursor-pointer flex gap-5"
                  >
                    <span>LOGIN</span>
                  </div>

                  <div
                    onClick={() => nav("/signup-page")}
                    className="cursor-pointer flex gap-5">SIGN UP</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row justify-center pb-6 pt-2">
        <SearchInput />
      </div>
    </div>
  );
}
