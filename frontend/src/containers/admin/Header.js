import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [tab, setTab] = useState(1);
    return (
        <div>
            <div className="p-6">
                <p className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</p>
            </div>
            <nav className="text-white text-base font-semibold pt-3">
                <Link to="">
                    <p
                        className={`flex items-center hover:bg-[#1947ee] opacity-75 hover:opacity-100 text-white py-4 pl-6 ${
                            tab === 1 && 'bg-[#1947ee]'
                        }`}
                        onClick={() => setTab(1)}
                    >
                        Dashboard
                    </p>
                </Link>
                <Link to="hotel">
                    <p
                        className={`flex items-center hover:bg-[#1947ee] opacity-75 hover:opacity-100 text-white py-4 pl-6 ${
                            tab === 2 && 'bg-[#1947ee]'
                        }`}
                        onClick={() => setTab(2)}
                    >
                        Hotel
                    </p>
                </Link>
                <Link to="roomType">
                    <p
                        className={`flex items-center hover:bg-[#1947ee] opacity-75 hover:opacity-100 text-white py-4 pl-6 ${
                            tab === 3 && 'bg-[#1947ee]'
                        }`}
                        onClick={() => setTab(3)}
                    >
                        Room Type
                    </p>
                </Link>
                <Link to="">
                    <p
                        className={`flex items-center hover:bg-[#1947ee] opacity-75 hover:opacity-100 text-white py-4 pl-6 ${
                            tab === 4 && 'bg-[#1947ee]'
                        }`}
                        onClick={() => setTab(4)}
                    >
                        User
                    </p>
                </Link>
                <Link to="">
                    <p
                        className={`flex items-center hover:bg-[#1947ee] opacity-75 hover:opacity-100 text-white py-4 pl-6 ${
                            tab === 5 && 'bg-[#1947ee]'
                        }`}
                        onClick={() => setTab(5)}
                    >
                        Bill
                    </p>
                </Link>
            </nav>
        </div>
    );
};

export default Header;
