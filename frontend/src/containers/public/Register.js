import React, { useState } from "react";
import { Button, InputForm } from "../../components";
import { validate } from "../system/validateLogin";
import { Link } from "react-router-dom"

const Register = () => {
    const [payload, setPayload] = useState({
        phone: "",
        pass: "",
        name: "",
        address: "",
        email: "",
        repass: "",
      });
      const [invalidfield, setInvalidfield] = useState([]);
      const handleSubmit = async (e) => {
        e.preventDefault();
        const validatiton = validate(payload);
        if (Object.keys(validatiton).length > 0) {
          setInvalidfield(validatiton);
        } else {
          setInvalidfield({});
          alert("ok");
        }
      };
      return (
        <div className="h-screen">
          <div className="w-1124 m-auto flex justify-center flex-row">
            <div className="mt-[130px] w-[500px] bg-white drop-shadow-xl py-10 px-5 font-sans">
              <div>
                <h1 className="font-semibold text-2xl">Đăng nhập</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <InputForm
                  setInvalidfield={setInvalidfield}
                  text="Tên đăng nhập"
                  type={"name"}
                  dropShadow="focus:drop-shadow-blue"
                  value={payload.name}
                  setValue={setPayload}
                />
                {invalidfield.name && (
                  <p style={{ color: "red" }}>{invalidfield.name}</p>
                )}
                <InputForm
                  setInvalidfield={setInvalidfield}
                  text="Mật khẩu"
                  type={"pass"}
                  dropShadow="focus:drop-shadow-blue"
                  value={payload.pass}
                  setValue={setPayload}
                />
                {invalidfield.pass && (
                  <p style={{ color: "red" }}>{invalidfield.pass}</p>
                )}
                <div className="mt-5 flex flex-col">
                  <Button
                    text="Đăng nhập"
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
                    <Link to="/login">
                    <span
                        onClick={() => {
                        setPayload({
                            phone: "",
                            pass: "",
                            name: "",
                            address: "",
                            email: "",
                            repass: "",
                        });
                        }}
                    >
                        Đăng ký
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
}

export default Register