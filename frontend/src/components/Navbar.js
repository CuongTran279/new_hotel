import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="grid grid-flow-col gap-7 font-sans">
        <li className="hover:text-sky-400 ease-in-out duration-300">
          <a href="/">Máy bay + Khách sạn</a>
        </li>
        <li className="hover:text-sky-400 ease-in-out duration-300">
          <a href="/">Chỗ ở</a>
        </li>
        <li className="hover:text-sky-400 ease-in-out duration-300">
          <a href="/">Phương tiện di chuyển</a>
        </li>
        <li className="hover:text-sky-400 ease-in-out duration-300">
          <a href="/">Hoạt động</a>
        </li>
        <li className="hover:text-sky-400 ease-in-out duration-300">
          <a href="/">Phiếu giảm giá và ưu đãi</a>
        </li>
        <li className="hover:text-sky-400 ease-in-out duration-300">
          <a href="/">eSim</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
