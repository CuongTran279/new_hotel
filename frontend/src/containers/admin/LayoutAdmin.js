import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const LayoutAdmin = () => {
  return (
    <div className='bg-gray-100 font-family-karla flex'>
      <aside className='relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl'>
        <Header/>
      </aside>
      <div className='w-full flex flex-col h-screen overflow-y-hidden'>
        <Outlet/>
      </div>
    </div>
  )
}

export default LayoutAdmin