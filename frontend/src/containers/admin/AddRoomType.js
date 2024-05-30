import React from 'react';
import { Link } from 'react-router-dom';
import { InputForm } from '../../components';

const AddRoomType = () => {
  return (
    <div>
      <header className='w-full items-center bg-white py-2 px-6 hidden sm:flex'>
        <div className="relative w-1/2 flex justify-start ">
          <Link to="/"><p className='cursor-pointer hover:underline'>Trở về trang chính</p></Link>
        </div>
        <div className='relative w-1/2 flex justify-end'>
          <button className='realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none'>
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400"/>
          </button>
        </div>
      </header>
      <div className='w-full overflow-x-hidden border-t flex flex-col'>
        <main className='w-full flex-grow p-6'>
          <h1 className="text-3xl text-black pb-6">Thêm mới RoomType</h1>
          <div className='bg-white overflow-auto'>
            <form className='p-10 bg-white rounded shadow-xl'>
              <div className='mt-2'>
                <label className='block text-sm text-gray-600'>Tên phòng</label>
                <input className='w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none'/>
              </div>
              <div className='mt-2'>
                <label className='block text-sm text-gray-600'>Ảnh</label>
                <input type='file' className='w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none'/>
              </div>
              <div className='mt-2'>
                <label className='block text-sm text-gray-600'>Mô tả</label>
                <input className='w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none'/>
              </div>
              <div className='mt-2'>
                <label className='block text-sm text-gray-600'>Giá</label>
                <input className='w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none'/>
              </div>
              <div className='mt-2'>
                <label className='block text-sm text-gray-600'>Số người tối đa 1 phòng</label>
                <input className='w-full px-5  py-4 text-gray-700 bg-gray-200 rounded outline-none'/>
              </div>
              <div className='mt-5'>
                <button className='font-semibold uppercase p-2 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]'>Thêm mới</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddRoomType