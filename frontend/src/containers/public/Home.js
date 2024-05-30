import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header className="h-[60px]">
        <Header />
      </header>
      <div className="w-screen h-full">
        <Outlet/>
      </div>
      <footer className="bg-gray-900 h-fit flex flex-col justify-center">
        <div className="text-white text-center my-10">
          CopryRight @2024 Trần Đình Cường
        </div>
      </footer>
    </div>
  );
};

export default Home;
