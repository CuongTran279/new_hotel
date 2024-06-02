import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateRoomType = () => {
    const [payload, setPayload] = useState({
        name: '',
        img: '',
        des: '',
        price: '',
        capicity: '',
    });
    const { id } = useParams();
    const [invalidfield, setInvalidfield] = useState([]);
    const navigate = useNavigate();
    const setValue = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    };
    const inputFiles = (e) => {
        const files = Array.from(e.target.files);
        setPayload({ ...payload, img: files });
    };
    const setInvalid = (e) => {
        const { name } = e.target;
        setInvalidfield({ ...invalidfield, [name]: undefined });
    };
    useEffect(() => {
        axios
            .get(`http://localhost:5000/getRoomType/`+ id)
            .then((res) =>
              // console.log(res.data)
                setPayload({
                    ...payload,
                    name: res.data[0].name,
                    img: res.data[0].img,
                    des: res.data[0].des,
                    price: res.data[0].price,
                    capicity: res.data[0].capicity,
                }),
                
            )
            .then((err) => console.log(err));
    }, []);
    const validate = () => {
        let err = {};
        if (!payload.name) err.name = 'Không được để trống';
        if (!payload.img) err.img = 'Không được để trống';
        if (!payload.des) err.des = 'Không được để trống';
        if (!payload.price) {
            err.price = 'Không được để trống';
        } else if (!payload.price.match(/^\d+$/)) {
            err.price = 'Giá phải là dạng số';
        }
        if (!payload.capicity) {
            err.capicity = 'Không được để trống';
        } else if (!payload.capicity.match(/^\d+$/)) {
            err.capicity = 'Số lượng người phải là dạng số';
        } else if (!payload.capicity.match(/^[0-9]$/)) {
            err.capicity = 'Một phòng chứa tối đa 9 người';
        }
        setInvalidfield(err);
        return Object.keys(err).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const filesImg = payload.img.map((file) => file.name);
            const { img, ...payloadNew } = payload;
            const payloadNew2 = { ...payloadNew, filesImg };
            axios
                .post('http://localhost:5000/addRoomType', payloadNew2)
                .then((res) =>
                    Swal.fire({
                        title: 'Thêm mới loại phòng thành công',
                        icon: 'success',
                    }).then(() => {
                        navigate('../roomType');
                    }),
                )
                .catch((err) => console.log(err.message));
        } else {
            setInvalidfield(validate);
        }
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
                    <h1 className="text-3xl text-black pb-6">Sửa RoomType</h1>
                    <div className="bg-white overflow-auto">
                        <form
                            className="p-10 bg-white rounded shadow-xl"
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Tên phòng</label>
                                <input
                                    value={payload.name}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="name"
                                    onChange={setValue}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.name && <p className="text-red-600 italic">{invalidfield.name}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Ảnh</label>
                                <input
                                    accept="image/*"
                                    type="file"
                                    multiple
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="img"
                                    value={payload.img}
                                    onChange={inputFiles}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.img && <p className="text-red-600 italic">{invalidfield.img}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Mô tả</label>
                                <input
                                    value={payload.des}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="des"
                                    onChange={setValue}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.des && <p className="text-red-600 italic">{invalidfield.des}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Giá</label>
                                <input
                                    value={payload.price}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="price"
                                    onChange={setValue}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.price && <p className="text-red-600 italic">{invalidfield.price}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Số người tối đa 1 phòng</label>
                                <input
                                    value={payload.capicity}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="capicity"
                                    onChange={setValue}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.capicity && (
                                    <p className="text-red-600 italic">{invalidfield.capicity}</p>
                                )}
                            </div>
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

export default UpdateRoomType;
