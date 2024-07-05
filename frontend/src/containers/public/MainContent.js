import React, { useEffect, useState } from 'react';
import FormSearch from './FormSearch';
import axios from 'axios';

const MainContent = () => {
    const [payload, setPayload] = useState([]);
    const getBackgroundImage = (address) => {
        switch (address) {
            case 'Nam Định':
                return "url('https://upload.wikimedia.org/wikipedia/commons/f/f4/Statue_of_Tran_Hung_Dao%2C_Nam_Dinh_City%2C_Vietnam_%2803%29.jpg')";
            case 'Hà Nội':
                return "url('https://vcdn1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ')";
            case 'Hạ Long':
                return "url('https://ik.imagekit.io/tvlk/blog/2022/10/kinh-nghiem-du-lich-vinh-ha-long-1.jpg?tr=dpr-2,w-675')";
            default:
                return "url('https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg')";
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
    const hotelMap = new Map();
    payload.forEach((hotel) => {
        const totalRooms = hotel.rooms.reduce((sum, room) => sum + room.quantity, 0);

        if (!hotelMap.has(hotel.address)) {
            hotelMap.set(hotel.address, {
                ...hotel,
                totalRooms,
            });
        } else {
            const existingHotel = hotelMap.get(hotel.address);
            existingHotel.totalRooms += totalRooms;
            existingHotel.rooms = [...existingHotel.rooms, ...hotel.rooms];
            hotelMap.set(hotel.address, existingHotel);
        }
    });
    const hotelsByAddress = Array.from(hotelMap.values());

    return (
        <div>
            <div
                className="bg-cover bg-center w-full h-[320px] "
                style={{
                    backgroundImage:
                        'url("https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png")',
                }}
            ></div>
            <div className="w-1124 m-auto h-full flex justify-center flex-row">
                <FormSearch />
            </div>
            <div className="mt-20 w-1124 m-auto h-full flex justify-center flex-col">
                {payload.length !== 0 ? (
                    <div className="flex flex-col justify-center items-center gap-20 mb-5">
                        <div>
                            <p className="uppercase font-mono text-3xl">Các địa danh</p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-20 mb-5">
                            {hotelsByAddress.map((hotel, index) => {
                                const bg = getBackgroundImage(hotel.address);
                                return (
                                    <div
                                        key={index}
                                        className={`cursor-pointer relative w-80 h-80 bg-cover bg-center hover:bg-opacity-0`}
                                        style={{ backgroundImage: bg }}
                                    >
                                        <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-col">
                                            <p className="text-white uppercase font-mono text-3xl">{hotel.address}</p>
                                            <p className="text-white font-sans text-lg">
                                                Số phòng hiện có : {hotel.totalRooms}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <h1 className="uppercase"> Chưa có bản ghi nào </h1>
                )}
                {payload.length !== 0 ? (
                    <div className="flex flex-col justify-center items-center gap-20 mb-5 mt-5">
                        <div>
                            <p className="uppercase font-mono text-3xl">Các khách sạn</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-20 mb-5 ml-0">
                            {payload.map((hotel, index) => {
                                return (
                                    <div className="p-[20px] h-[323px] w-[880px] border flex flex-row">
                                        <div
                                            style={{
                                                backgroundImage:
                                                    'url("https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg")',
                                            }}
                                            className='w-5/12'
                                        ></div>
                                        <div className='w-6/12 flex flex-col gap-4 overflow-hidden'>
                                            <p className="uppercase text-2xl">{hotel.name}</p>
                                            <p>{hotel.address}</p>
                                            <p className='text-red-500'>{hotel.phone}</p>
                                            <p className='italic'>{hotel.des}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <h1 className="uppercase"> Chưa có bản ghi nào </h1>
                )}
            </div>
        </div>
    );
};

export default MainContent;
