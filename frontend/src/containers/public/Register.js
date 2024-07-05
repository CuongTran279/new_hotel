import React, { useState } from 'react';
import { Button, InputForm } from '../../components';
import { validate } from '../system/validateLogin';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const [payload, setPayload] = useState({
        name: '',
        pass: '',
    });
    const navigate = useNavigate();
    const [invalidfield, setInvalidfield] = useState([]);
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const validatiton = validate(payload);
        setInvalidfield(validatiton);
        console.log(invalidfield.name);
        const { repass, email, phone, address, ...payloadLogin } = payload;
        if (payload.name !== '' && payload.pass !== '') {
            axios
                .post('http://localhost:5000/signIn', payloadLogin)
                .then((res) => {
                    if (res.data.message === 'Success') {
                        Swal.fire({
                            title: 'Bạn đã đăng nhập thành công',
                            icon: 'success',
                        })
                            .then(() => {
                                localStorage.setItem('authToken', JSON.stringify(res.data.data));
                                localStorage.setItem('role', JSON.stringify(res.data.data.role));
                            })
                            .then(() => {
                                navigate('/');
                                window.location.reload();
                            });
                    } else {
                        Swal.fire({
                            title: 'Không tồn tại tài khoản này',
                            icon: 'error',
                        });
                    }
                })
                .catch((err) =>
                    Swal.fire({
                        title: 'Không tồn tại tài khoản này',
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
                        <h1 className="font-semibold text-2xl">Đăng nhập</h1>
                    </div>
                    <form onSubmit={handleSubmit1}>
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
                        <div className="mt-5 flex flex-col">
                            <Button
                                text="Đăng nhập"
                                type="submit"
                                textColor="text-[#5392f9]"
                                outline="outline-[#5392f9]"
                                hoverBg="hover:bg-[#5392f9]"
                                hoverText="hover:text-white"
                                onClick={handleSubmit1}
                            />
                        </div>
                    </form>
                    <div className="mt-5 flex flex-row justify-between">
                        <p className="text-[#5392f9] ease-in-out duration-100 hover:text-[#e12d2d] cursor-pointer">
                            <Link to="/login">
                                <span>Đăng ký</span>
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

export default Register;
