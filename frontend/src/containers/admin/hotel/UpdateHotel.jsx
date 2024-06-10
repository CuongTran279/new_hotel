import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateHotel = () => {
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
                const hotelsWithRoomCount = Array.from(hotelMap.values()).map((hotel) => ({
                    ...hotel,
                    roomCount: hotel.rooms.length,
                }));

                setPayload(hotelsWithRoomCount);
            })
            .then((err) => console.log(err));
    }, [id]);
    console.log(payload);
    const handleChange = (hotelId, roomId, newQuantity) => {
        setPayload((prevPayload) =>
            prevPayload.map((hotel) => {
                if (hotel.id === hotelId) {
                    return {
                        ...hotel,
                        rooms: hotel.rooms.map((room) => {
                            if (room.id === roomId) {
                                return { ...room, newQuantity: newQuantity }; // Lưu số lượng phòng tạm thời
                            }
                            return room;
                        }),
                    };
                }
                return hotel;
            }),
        );
    };
    const handleSubmit = (hotelId, roomId) => {
        const hotel = payload.find((hotel) => hotel.id === hotelId);
        const room = hotel.rooms.find((room) => room.id === roomId);
        const newQuantity = room.newQuantity || room.quantity;

        axios
            .post('http://localhost:5000/updateQuantityRoom', {
                hotelId,
                roomId,
                quantity: newQuantity,
            })
            .then((response) => {
                setPayload((prevPayload) =>
                    prevPayload.map((hotel) => {
                        if (hotel.id === hotelId) {
                            return {
                                ...hotel,
                                rooms: hotel.rooms.map((room) => {
                                    if (room.id === roomId) {
                                        return { ...room, quantity: newQuantity, newQuantity: undefined }; // Cập nhật số lượng phòng và xóa số lượng tạm thời
                                    }
                                    return room;
                                }),
                            };
                        }
                        return hotel;
                    }),
                );
                Swal.fire({
                    title: 'Sửa thành công',
                    icon: 'success',
                })
            })
            .catch((error) => {
                console.error('There was an error updating the room quantity!', error);
            });
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
                        {Array.isArray(payload) ? (
                            payload.map((hotel, i) => (
                                <div key={i}>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Tên Hotel</label>
                                        <input
                                            value={hotel.name}
                                            className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                            name="name"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Address</label>
                                        <input
                                            value={hotel.address}
                                            className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                            name="address"
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm text-gray-600">Phone</label>
                                        <input
                                            value={hotel.phone}
                                            className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                            name="phone"
                                        />
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
                                                    <div className="flex flex-col">
                                                        <label htmlFor="">Quantity: {room.quantity}</label>
                                                        <input
                                                            type="number"
                                                            className="border border-[#5392f9] outline-none"
                                                            value={
                                                                room.newQuantity !== undefined
                                                                    ? room.newQuantity
                                                                    : room.quantity
                                                            }
                                                            onChange={(e) =>
                                                                handleChange(hotel.id, room.id, e.target.value)
                                                            }
                                                        />
                                                        <button
                                                            className="font-semibold uppercase p-2 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]"
                                                            onClick={() => handleSubmit(hotel.id, room.id)}
                                                        >
                                                            Cập nhật
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}
                        {/* <div className="mt-5">
                                <button
                                    className="font-semibold uppercase p-2 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]"
                                    type="submit"
                                >
                                    Sửa
                                </button>
                            </div> */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UpdateHotel;
