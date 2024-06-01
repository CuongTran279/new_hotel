import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
const ListRoomType = () => {
    const [payload, setPayload] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:5000/roomType')
            .then((res) => setPayload(res.data))
            .then((err) => console.log(err));
    }, []);

    return (
        <div>
            <header className="w-full items-center bg-white py-2 px-6 sm:flex">
                <div className="relative w-1/2 flex justify-start ">
                    <Link to="/">
                        <p className="cursor-pointer hover:underline">Trở về trang chính</p>
                    </Link>
                </div>
                <div className="relative w-1/2 flex justify-end">
                    <button className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                        <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt='Ok'/>
                    </button>
                </div>
            </header>
            <div className="w-full border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <h1 className="text-3xl text-black pb-6">RoomType</h1>
                    <div className="w-full mt-6">
                        <div className="flex align-middle">
                            <p className="text-xl pb-3 relative w-1/2 flex justify-start">Danh sách</p>
                            <div className="pb-3 relative w-1/2 flex justify-end">
                                <Link to="../addRoomType">
                                    <button className="font-semibold uppercase p-5 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]">
                                        Thêm mới
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white ">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">IMG</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Description
                                        </th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Capicity
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {payload.map((room, i) => {
                                        JSON.parse(room.img_paths).forEach((element) => {
                                            return <div className="text-red-600">{element}</div>;
                                        });
                                        return (
                                            <tr key={i}>
                                                <td className="text-left py-3 px-4">{room.id}</td>
                                                <td className="text-left py-3 px-4">{room.name}</td>
                                                <td className="text-left py-3 px-4 grid grid-cols-2">
                                                    {JSON.parse(room.img_paths).map((element,i) => {
                                                        return (
                                                            <div className="w-24 h-24" key={i}>
                                                                <img src={require(`../../../uploads/${element}`)} alt='Ok'/>
                                                            </div>
                                                        );
                                                    })}
                                                </td>
                                                <td className="text-left py-3 px-4">{room.des}</td>
                                                <td className="text-left py-3 px-4">{room.price}</td>
                                                <td className="text-left py-3 px-4">{room.capicity}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ListRoomType;
