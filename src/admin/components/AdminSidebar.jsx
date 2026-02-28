import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { IoHome } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";





function AdminSidebar() {

    const location = useLocation()
    const [collapse, setCollapse] = useState(false)

    return (
        <div className='bg-blue-300 min-h-full flex flex-col items-center justify-center py-10'>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="adminpp"
                className='w-[60%] h-[60%]' />
            <h1 className='my-3 font-semibold flex items-center gap-4'>
                Admin
                <button onClick={() => { setCollapse(!collapse) }}>
                    <GiHamburgerMenu />
                </button>
            </h1>
            {
                !collapse &&
                <div>
                    <div className='flex gap-2 items-center my-3'>
                        <input type="radio" name="sidebar" id="home" checked={location.pathname === '/admin-dashboard'} readOnly />{' '}
                        <Link to={'/admin-dashboard'}>
                            <label htmlFor="home" className='flex gap-2 items-center'>
                                <IoHome />
                                Home
                            </label>
                        </Link>
                    </div>
                    <div className='flex gap-2 items-center my-3'>
                        <input type="radio" name="sidebar" id="book" checked={location.pathname === '/admin-books'} readOnly />{' '}
                        <Link to={'/admin-books'}>
                            <label htmlFor="book" className='flex gap-2 items-center'>
                                <FaBook />
                                Resources
                            </label>
                        </Link>
                    </div>
                    <div className='flex gap-2 items-center my-3'>
                        <input type="radio" name="sidebar" id="" checked={location.pathname === '/admin-career'} readOnly />{' '}
                        <Link to={'/admin-career'}>
                            <label htmlFor="" className='flex gap-2 items-center'>
                                <FaBagShopping />
                                Careers
                            </label>
                        </Link>
                    </div>
                    <div className='flex gap-2 items-center my-3'>
                        <input type="radio" name="sidebar" id="" checked={location.pathname === '/admin-settings'} readOnly />{' '}
                        <Link to={'/admin-settings'}>
                            <label htmlFor="" className='flex gap-2 items-center'>
                                <IoIosSettings />
                                Settings
                            </label>
                        </Link>
                    </div>
                </div>

            }

        </div>
    )
}

export default AdminSidebar