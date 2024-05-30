import React from 'react'
import { Link } from 'react-router-dom';
const ListRoomType = () => {
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
          <h1 className="text-3xl text-black pb-6">RoomType</h1>
          <div className='w-full mt-6'>
            <div className='flex align-middle'>
              <p className='text-xl pb-3 relative w-1/2 flex justify-start'>
                Danh sách
              </p> 
              <div className='pb-3 relative w-1/2 flex justify-end'>
                <Link to="../addRoomType"><button className='font-semibold uppercase p-5 bg-[#1947ee] text-white rounded-xl hover:bg-[#3d68ff]'>Thêm mới</button></Link>
              </div>
            </div>
            
            <div className='bg-white overflow-auto'>
              <table className='min-w-full bg-white'>
                <thead className='bg-gray-800 text-white'>
                  <tr>
                    <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
                      ID
                    </th>
                    <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
                      Name
                    </th>
                    <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
                      IMG
                    </th>
                    <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
                      Description
                    </th>
                    <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
                      Price
                    </th>
                    <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
                      Capicity
                    </th>
                  </tr>
                </thead>
                <tbody className='text-gray-700'>
                  <tr>
                    <td className='text-left py-3 px-4'>
                      1
                    </td>
                    <td className='text-left py-3 px-4'>
                      1
                    </td>
                    <td className='text-left py-3 px-4'>
                      1
                    </td>
                    <td className='text-left py-3 px-4'>
                      1
                    </td>
                    <td className='text-left py-3 px-4'>
                      1
                    </td>
                    <td className='text-left py-3 px-4'>
                      1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ListRoomType