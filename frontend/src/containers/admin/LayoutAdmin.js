import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const LayoutAdmin = () => {
  return (
    <div className='bg-gray-100 font-family-karla flex'>
      <aside className='fixed bg-[#3d68ff] h-screen w-1/6 sm:block shadow-xl top-0 left-0'>
        <Header/>
      </aside>
      <div className='flex flex-col h-screen w-5/6 absolute right-0  '>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutAdmin