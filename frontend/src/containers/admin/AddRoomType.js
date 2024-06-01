import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddRoomType = () => {
    const [payload, setPayload] = useState({
        name: '',
        img: '',
        des: '',
        price: '',
        capicity: '',
    });
    const setValue = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    };
    const inputFiles = (e) => {
        const files = Array.from(e.target.files);
        setPayload({ ...payload, img: files });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const filesImg = payload.img.map(file=>file.name);
        const {img,...payloadNew} = payload
        const payloadNew2 = {...payloadNew,filesImg}
        console.log(payloadNew2);
        axios.post('http://localhost:5000/addRoomType',payloadNew2)
          .then((res)=>console.log("Upload ok"))
          .catch((err)=>console.log(err.message))
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
                    <h1 className="text-3xl text-black pb-6">Thêm mới RoomType</h1>
                    <div className="bg-white overflow-auto">
                        <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Tên phòng</label>
                                <input
                                    value={payload.name}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="name"
                                    onChange={setValue}
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Ảnh</label>
                                <input
                                    accept="image/*"
                                    type="file"
                                    multiple
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="img"
                                    onChange={inputFiles}
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Mô tả</label>
                                <input
                                    value={payload.des}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="des"
                                    onChange={setValue}
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Giá</label>
                                <input
                                    value={payload.price}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="price"
                                    onChange={setValue}
                                />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Số người tối đa 1 phòng</label>
                                <input
                                    value={payload.capicity}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="capicity"
                                    onChange={setValue}
                                />
                            </div>
                            <div className="mt-5">
                                <button
                                    className="font-semibold uppercase p-2 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]"
                                    type='submit'
                                >
                                    Thêm mới
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddRoomType;
