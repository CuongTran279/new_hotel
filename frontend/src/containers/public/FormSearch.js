import React from "react";
import NumericInput from 'react-numeric-input';
import { Button } from '../../components';

const FormSearch = () => {
  return (
    <div className="h-[300px] w-1124 rounded-xl drop-shadow-xl bg-white flex justify-center flex-col px-14 mt-[-100px]">
      <div className="mt-2">
        <h2 className="font-medium text-base">Tìm kiếm phòng</h2>
      </div>
      <div className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Nhập điểm du lịch và khách sạn"
          className="h-[66px] w-[1150px] outline-none  border-b-[1px] focus:border-b-[#5392f9] p-5"
        />
      </div>
      <div className="mt-10 flex flex-row gap-5 justify-between">
        <div className="flex flex-col gap-2">
          <label for="">Ngày đến</label>
          <input
            type="date"
            className="outline-none border border-[#dddfe2] rounded-md p-5 focus:drop-shadow-blue "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="">Ngày đi</label>
          <input
            type="date"
            className="outline-none border border-[#dddfe2] rounded-md p-5 focus:drop-shadow-blue"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="">Số phòng</label>
          <NumericInput
            min={1}
            max={100}
            step={1}
            value={1}
            type="number"
            className="outline-none border border-[#dddfe2] rounded-md p-5 focus:drop-shadow-blue"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="">Người lớn</label>
          <NumericInput
            min={1}
            max={100}
            step={1}
            value={1}
            className="outline-none border border-[#dddfe2] rounded-md p-5 focus:drop-shadow-blue"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label for="">Trẻ em</label>
          <NumericInput
            min={0}
            max={100}
            step={1}
            value={0}
            className="outline-none border border-[#dddfe2] rounded-md p-5 focus:drop-shadow-blue"
          />
        </div>
      </div>
      <div className="mt-5 flex justify-center items-center">
        <div>
          <Button
            text="Tìm phòng"
            textColor="text-[#5392f9]"
            outline="outline-[#5392f9]"
            hoverBg="hover:bg-[#5392f9]"
            hoverText="hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FormSearch;
