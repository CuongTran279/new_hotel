import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <div className='p-6'>
            <p className='text-white text-3xl font-semibold uppercase hover:text-gray-300'>Admin</p>
        </div>
        <nav className='text-white text-base font-semibold pt-3'>
            <Link to="">
                <p className='flex items-center hover:bg-[#1947ee] text-white py-4 pl-6 nav-item'>
                    Dashboard
                </p>
            </Link>
            <Link to="">
                <p className='flex items-center text-white py-4 pl-6 nav-item opacity-75 hover:opacity-100 hover:bg-[#1947ee]'>
                    Hotel
                </p>
            </Link>
            <Link to="roomType">
                <p className='flex items-center text-white py-4 pl-6 nav-item opacity-75 hover:opacity-100 hover:bg-[#1947ee]'>
                    Room Type
                </p>
            </Link>
            <Link to="">
                <p className='flex items-center text-white py-4 pl-6 nav-item opacity-75 hover:opacity-100 hover:bg-[#1947ee]'>
                    User
                </p>
            </Link>
            <Link to="">
                <p className='flex items-center text-white py-4 pl-6 nav-item opacity-75 hover:opacity-100 hover:bg-[#1947ee]'>
                    Bill
                </p>
            </Link>
        </nav>
    </div>
    
  )
}

export default Header