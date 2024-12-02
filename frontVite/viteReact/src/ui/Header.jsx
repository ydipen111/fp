import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfieMenu";
import { useNavigate } from "react-router";




export function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate()

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        {user ? <ProfileMenu user={user} /> :
          <Button onClick={() => nav('/login-page')} size="sm" variant="text">
            <span>Log In</span>
          </Button>
        }


      </div>
    </Navbar>
  );
}