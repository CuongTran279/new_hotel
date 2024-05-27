import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="h-[60px]">
        <Header />
      </div>
      <div className="w-screen h-full">
        <Outlet/>
      </div>
    </div>
  );
};

export default Home;
