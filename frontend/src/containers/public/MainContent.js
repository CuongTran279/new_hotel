import React, { useEffect, useState } from 'react';
import FormSearch from './FormSearch';
import axios from 'axios';

const MainContent = () => {
    const [payload, setPayload] = useState([]);
    const getBackgroundImage = (address) => {
        switch (address) {
            case 'Nam định':
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

                setPayload(Array.from(hotelMap.values()));
            })
            .catch((err) => console.log(err));
    }, []);
    const totalRoomsByAddress = payload.reduce((acc, hotel) => {
        const totalRooms = hotel.rooms.reduce((sum, room) => sum + room.quantity, 0);
        if (acc[hotel.address]) {
            acc[hotel.address] += totalRooms;
        } else {
            acc[hotel.address] = totalRooms;
        }
        return acc;
    }, {});

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
            <div className="mt-20 w-1124 m-auto h-full flex justify-center flex-row">
                {payload.length !== 0 ? (
                    <div className="flex flex-row justify-center items-center gap-20 mb-5">
                        {payload.map((hotel, index) => {
                            console.log(hotel);
                            hotel.rooms.map((room,i)=>{
                                if(hotel.address){
                                    
                                }
                                return room;
                            })
                            const bg = getBackgroundImage(hotel.address);
                            return (
                                <div key={index} className={`cursor-pointer relative w-80 h-80 bg-cover bg-center hover:bg-opacity-0`} style={{ backgroundImage: bg }}>
                                    <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center flex-col">
                                        <p className="text-black uppercase font-mono text-3xl">{hotel.address}</p>
                                        <p className="text-black font-sans text-lg">Số phòng hiện có : {totalRoomsByAddress[hotel.address]}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <h1 className="uppercase"> Chưa có bản ghi nào </h1>
                )}
            </div>
        </div>
    );
};

export default MainContent;
