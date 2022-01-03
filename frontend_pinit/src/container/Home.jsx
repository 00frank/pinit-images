import React, { useState, useRef, useEffect } from "react";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";
import { Link, Routes, Route } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import { client as sanityClient } from "../client/sanityClient";
import { userQuery } from "../utils/data";
import Pins from "./Pins";

// assets
import logo from "../assets/logo.png";

export default function Home() {
  const [sidebarOpen, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef();

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    async function getUserData() {
      const query = userQuery(userInfo.googleId);
      const loggedUser = await sanityClient.fetch(query);
      console.log(loggedUser[0]);
      setUser(loggedUser[0]);
    }
    getUserData();
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      {/* Sidebar for desktop/tablet */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      {/* Header for mobile */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <MenuIcon
            fontSize={40}
            onClick={() => setToggleSidebar(true)}
            className="cursor-pointer"
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-image" className="w-28" />
          </Link>
        </div>
        {/* Sidebar showing for mobile */}
        {sidebarOpen && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <CloseIcon
                fontSize={30}
                onClick={() => setToggleSidebar(false)}
                className="cursor-pointer"
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      {/* In page content */}
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}
