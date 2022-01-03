import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill as HomeIcon } from "react-icons/ri";
import { IoIosArrowFoward } from "react-icons/io";

//assets
import logo from "../assets/logo.png";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";
const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const categories = [
  { name: "Animals" },
  { name: "Wallpapers" },
  { name: "Photography" },
  { name: "Gaming" },
  { name: "Tech" },
  { name: "Other" },
];

function Sidebar({ user, closeToggle }) {
  const handleCloseSidebar = () => {
    // for mobile behaviour/when click on logo close sidebar
    if (closeToggle) closeToggle();
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <HomeIcon />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Descubre nuevas categorías
          </h3>
          {categories.slice(0, categories.length - 1).map((categ) => (
            <NavLink
              to={`/category/${categ.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={categ.name}
            >
              {categ.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
