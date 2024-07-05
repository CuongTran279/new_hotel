import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddHotel = () => {
    const [payload, setPayload] = useState({
        name: '',
        address: '',
        phone: '',
        des: ''
    });
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [invalidfield, setInvalidfield] = useState([]);
    const [formData, setFormData] = useState({});
    const [options, setOptions] = useState([]);
    const setInvalid = (e) => {
        const { name } = e.target;
        setInvalidfield({ ...invalidfield, [name]: undefined });
    };
    const option = [
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Nam Định', label: 'Nam Định' },
        { value: 'Hạ Long', label: 'Hạ Long' },
    ];
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const setValue = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    };
    const validate = () => {
        let err = {};
        if (!payload.name) err.name = 'Không được để trống';
        if (!payload.des) err.des = 'Không được để trống';
        if (!payload.phone) {
            err.phone = 'Số điện thoại không được để trống.';
        } else if (!payload.phone.match(/^\d+$/)) {
            err.phone = 'Số điện thoại phải có dạng số';
        } else if (!payload.phone.match(/^[0-9]{10}$/)) {
            err.phone = 'Số điện thoại phải có 10 chữ số.';
        } else if (!payload.phone.match(/^0[0-9]{9}$/)) {
            err.phone = 'Số điện thoại phải bắt đầu từ số 0';
        }
        setInvalidfield(err);
        return Object.keys(err).length === 0;
    };
    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter((option) => option !== value)
                : [...prevSelectedOptions, value],
        );
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/roomType')
            .then((res) => setOptions(res.data))
            .catch((err) => console.log(err));
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append('name', payload.name);
            formData.append('address', selectedOption);
            formData.append('phone', payload.phone);
            formData.append('des', payload.des);
            formData.append('options', selectedOptions);
            const formObject = Object.fromEntries(formData.entries());
            setFormData(formObject);
            console.log(formObject);
            axios
                .post('http://localhost:5000/addHotel', formObject)
                .then((res) =>
                    Swal.fire({
                        title: 'Thêm mới khách sạn thành công',
                        icon: 'success',
                    }).then(() => {
                        navigate('../hotel');
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
                    <h1 className="text-3xl text-black pb-6">Thêm mới Hotel</h1>
                    <div className="bg-white overflow-auto">
                        <form className="p-10 bg-white rounded shadow-xl" onSubmit={handleSubmit}>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Tên Hotel</label>
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
                                <label className="block text-sm text-gray-600">Địa chỉ</label>
                                <select value={selectedOption} onChange={handleChange}>
                                    <option value="" disabled>
                                        Select an option
                                    </option>
                                    {option.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Số điện thoại</label>
                                <input
                                    value={payload.phone}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="phone"
                                    onChange={setValue}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.phone && <p className="text-red-600 italic">{invalidfield.phone}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Mô tả</label>
                                <textarea
                                    value={payload.des}
                                    className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none"
                                    name="des"
                                    onChange={setValue}
                                    onFocus={setInvalid}
                                />
                                {invalidfield.des && <p className="text-red-600 italic">{invalidfield.des}</p>}
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600">Các loại phòng</label>
                                <div className="flex flex-col gap-10">
                                    {options.map((option) => (
                                        <label key={option.id}>
                                            <input
                                                type="checkbox"
                                                value={option.id}
                                                onChange={handleOptionChange}
                                                checked={selectedOptions.includes(option.id.toString())}
                                            />
                                            {option.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    className="font-semibold uppercase p-2 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]"
                                    type="submit"
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

export default AddHotel;
