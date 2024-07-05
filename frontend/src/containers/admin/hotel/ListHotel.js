import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const ListHotel = () => {
    const [payload, setPayload] = useState([]);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        const confirm = window.confirm('Bạn có chắc chắn muốn xóa?');
        if (confirm) {
            axios
                .delete('http://localhost:5000/deleteHotel/' + id)
                .then((res) => {
                    Swal.fire({
                        title: 'Xóa thành công',
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                })
                .then((err) => console.log(err));
        }
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/hotel')
            .then((res) => {
                const hotelMap = new Map();

                res.data.forEach((hotel) => {
                    const {
                        id,
                        name,
                        address,
                        phone,
                        des,
                        roomTypeId,
                        roomTypeName,
                        roomDescription,
                        roomPrice,
                        roomCapacity,
                        roomImages,
                        roomQuantity,
                    } = hotel;

                    if (!hotelMap.has(id)) {
                        hotelMap.set(id, {
                            id,
                            name,
                            address,
                            phone,
                            des,
                            rooms: [],
                        });
                    }

                    const hotelData = hotelMap.get(id);
                    hotelData.rooms.push({
                        id: roomTypeId,
                        name: roomTypeName,
                        description: roomDescription,
                        price: roomPrice,
                        capacity: roomCapacity,
                        quantity: roomQuantity,
                        images: roomImages.split('|'),
                    });
                });

                setPayload(Array.from(hotelMap.values()));
            })
            .catch((err) => console.log(err));
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
                        <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="Ok" />
                    </button>
                </div>
            </header>
            <div className="w-full border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <h1 className="text-3xl text-black pb-6">Hotel</h1>
                    <div className="w-full mt-6">
                        <div className="flex align-middle">
                            <p className="text-xl pb-3 relative w-1/2 flex justify-start">Danh sách</p>
                            <div className="pb-3 relative w-1/2 flex justify-end">
                                <Link to="../addHotel">
                                    <button className="font-semibold uppercase p-5 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]">
                                        Thêm mới
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white ">
                            <table className="min-w-full bg-white ">
                                <thead className="bg-gray-800 text-white text-center justify-center">
                                    <tr>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center">
                                            ID
                                        </th>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center">
                                            Name
                                        </th>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center">
                                            Address
                                        </th>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center">
                                            Phone
                                        </th>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center w-60">
                                            Description
                                        </th>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center">
                                            Room
                                        </th>
                                        <th className=" py-3 px-4 uppercase font-semibold text-sm  text-center justify-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                {payload.length !== 0 ? (
                                    <tbody className="text-gray-700 text-center border-b">
                                        {payload.map((hotel, i) => {
                                            console.log(hotel);
                                            return (
                                                <tr key={i} className="text-center">
                                                    <td className=" py-3 px-4">{hotel.id}</td>
                                                    <td className=" py-3 px-4">{hotel.name}</td>
                                                    <td className=" py-3 px-4">{hotel.address}</td>
                                                    <td className=" py-3 px-4">{hotel.phone}</td>
                                                    <td className=" py-3 px-4">{hotel.des}</td>
                                                    <td className=" py-3 px-4 grid grid-rows text-left w-[500px]">
                                                        {hotel.rooms.map((room, key) => (
                                                            <div key={key} className="border-b mb-5">
                                                                {room.images.map((image, imgIndex) => (
                                                                    <img
                                                                        key={imgIndex}
                                                                        src={require(`../../../image/${image}`)}
                                                                        alt={room.name}
                                                                        className="w-28 mb-10 flex"
                                                                    />
                                                                ))}
                                                                <h3>Room Type: {room.name}</h3>
                                                                <p>Description: {room.description}</p>
                                                                <p>Price: {room.price}</p>
                                                                <p>Capacity: {room.capacity}</p>
                                                                <p>Quantity: {room.quantity}</p>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => navigate(`../updateHotel/${hotel.id}`)}
                                                            type=""
                                                            className="p-2 outline-none bg-[#4183ec] text-white rounded-md hover:bg-[#5392f9] mr-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(hotel.id)}
                                                            type=""
                                                            className="p-2 outline-none bg-[#c53456] text-white rounded-md hover:bg-[#ff567d]"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                ) : (
                                    <h1 className="uppercase"> Chưa có bản ghi nào </h1>
                                )}
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ListHotel;
