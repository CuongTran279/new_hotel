import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateHotel = () => {
    const [invalidfield, setInvalidfield] = useState([]);
    const [payload, setPayload] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        axios
            .get('http://localhost:5000/getHotel/' + id)
            .then((res) => {
                const hotelMap = new Map();

                res.data.forEach((hotel) => {
                    const {
                        id,
                        name,
                        address,
                        phone,
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
                const hotelsWithRoomCount = Array.from(hotelMap.values()).map(hotel => ({
                  ...hotel,
                  roomCount: hotel.rooms.length
                }));

                setPayload(hotelsWithRoomCount);
            })
            .then((err) => console.log(err));
    }, [id]);
    console.log(payload);
    const setValue = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    };
    const setInvalid = (e) => {
        const { name } = e.target;
        setInvalidfield({ ...invalidfield, [name]: undefined });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
                <div className="relative w-1/2 flex justify-start ">
                    <Link to="/">
                        <p className="cursor-pointer hover:underline">Trở về trang chính</p>
                    </Link>
                </div>
                <div className="relative w-1/2 flex justify-end">
                    <button className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                        <img alt="img" src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
                    </button>
                </div>
            </header>
            <div className="w-full overflow-x-hidden border-t flex flex-col">
                <main className="w-full flex-grow p-6">
                    <h1 className="text-3xl text-black pb-6">Sửa Hotel</h1>
                    <div className="bg-white overflow-auto">
                        <form
                            className="p-10 bg-white rounded shadow-xl"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            {payload.map((hotel, i) => (
                                <div>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Tên Hotel</label>
                                        <input
                                            value={hotel.name}
                                            className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                            name="name"
                                            onChange={setValue}
                                            onFocus={setInvalid}
                                        />
                                        {invalidfield.name && (
                                            <p className="text-red-600 italic">{invalidfield.name}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Address</label>
                                        <input
                                            value={hotel.address}
                                            className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                            name="address"
                                            onChange={setValue}
                                            onFocus={setInvalid}
                                        />
                                        {invalidfield.address && (
                                            <p className="text-red-600 italic">{invalidfield.address}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Phone</label>
                                        <input
                                            value={hotel.phone}
                                            className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                            name="phone"
                                            onChange={setValue}
                                            onFocus={setInvalid}
                                        />
                                        {invalidfield.phone && (
                                            <p className="text-red-600 italic">{invalidfield.phone}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Rooms - {hotel.roomCount}</label>
                                        <div className="mt-2">
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-5">
                                <button
                                    className="font-semibold uppercase p-2 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]"
                                    type="submit"
                                >
                                    Sửa
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UpdateHotel;
