import React, { useState } from 'react';
import { Button, InputForm } from '../../components';
import { validate } from '../system/validateLogin';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
    const [payload, setPayload] = useState({
        email: '',
        name: '',
        pass: '',
        phone: '',
        address: '',
        repass: '',
    });
    const navigate = useNavigate();
    const [invalidfield, setInvalidfield] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validatiton = validate(payload);
        if (Object.keys(validatiton).length > 0) {
            setInvalidfield(validatiton);
        } else {
            setInvalidfield({});
            const { repass, ...payloadRegister } = payload;
            axios
                .post('http://localhost:5000/signUp', payloadRegister)
                .then((res) =>
                    Swal.fire({
                        title: 'Bạn đã đăng ký thành công',
                        icon: 'success',
                    }).then(() => {
                        navigate('/register');
                    }),
                )
                .catch((err) =>
                    Swal.fire({
                        title: 'Đã có lỗi xảy ra',
                        text: err.message,
                        icon: 'error',
                    }),
                );
        }
    };
    return (
        <div className="h-screen">
            <div className="w-1124 m-auto flex justify-center flex-row">
                <div className="mt-[130px] w-[500px] bg-white drop-shadow-xl py-10 px-5 font-sans">
                    <div>
                        <h1 className="font-semibold text-2xl">Đăng ký</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <InputForm
                            setInvalidfield={setInvalidfield}
                            text="Email"
                            dropShadow="focus:drop-shadow-blue"
                            value={payload.email}
                            setValue={setPayload}
                            type={'email'}
                        />
                        {invalidfield.email && <p style={{ color: 'red' }}>{invalidfield.email}</p>}
                        <InputForm
                            setInvalidfield={setInvalidfield}
                            text="Địa chỉ"
                            dropShadow="focus:drop-shadow-blue"
                            value={payload.address}
                            setValue={setPayload}
                            type={'address'}
                        />
                        {invalidfield.address && <p style={{ color: 'red' }}>{invalidfield.address}</p>}
                        <InputForm
                            setInvalidfield={setInvalidfield}
                            text="SĐT"
                            dropShadow="focus:drop-shadow-blue"
                            value={payload.phone}
                            setValue={setPayload}
                            type={'phone'}
                        />
                        {invalidfield.phone && <p style={{ color: 'red' }}>{invalidfield.phone}</p>}
                        <InputForm
                            setInvalidfield={setInvalidfield}
                            text="Tên đăng nhập"
                            type={'name'}
                            dropShadow="focus:drop-shadow-blue"
                            value={payload.name}
                            setValue={setPayload}
                        />
                        {invalidfield.name && <p style={{ color: 'red' }}>{invalidfield.name}</p>}
                        <InputForm
                            setInvalidfield={setInvalidfield}
                            text="Mật khẩu"
                            type={'pass'}
                            dropShadow="focus:drop-shadow-blue"
                            value={payload.pass}
                            setValue={setPayload}
                        />
                        {invalidfield.pass && <p style={{ color: 'red' }}>{invalidfield.pass}</p>}
                        <InputForm
                            setInvalidfield={setInvalidfield}
                            text="Nhập lại mật khẩu"
                            type={'repass'}
                            dropShadow="focus:drop-shadow-blue"
                            value={payload.repass}
                            setValue={setPayload}
                        />
                        {invalidfield.repass && <p style={{ color: 'red' }}>{invalidfield.repass}</p>}
                        <div className="mt-5 flex flex-col">
                            <Button
                                text="Đăng ký"
                                type="submit"
                                textColor="text-[#5392f9]"
                                outline="outline-[#5392f9]"
                                hoverBg="hover:bg-[#5392f9]"
                                hoverText="hover:text-white"
                                onClick={handleSubmit}
                            />
                        </div>
                    </form>
                    <div className="mt-5 flex flex-row justify-between">
                        <p className="text-[#5392f9] ease-in-out duration-100 hover:text-[#e12d2d] cursor-pointer">
                            <Link to="/register">
                                <span
                                    onClick={() => {
                                        setPayload({
                                            phone: '',
                                            pass: '',
                                            name: '',
                                            address: '',
                                            email: '',
                                            repass: '',
                                        });
                                    }}
                                >
                                    Đăng nhập
                                </span>
                            </Link>
                        </p>
                        <p className="text-[#5392f9] ease-in-out duration-100 hover:text-[#e12d2d] cursor-pointer">
                            Quên mật khẩu
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
