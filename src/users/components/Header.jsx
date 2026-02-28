import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";




function Header() {

  const [menuState,setMenuState]=useState(false)

  return (
    <>

      <div className='grid grid-cols-3 p-5'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <img src="/headerlogo.png" alt="logo" className='w-[50px] h-50px' />
          <h1 className='text-2xl font-bold md:hidden'>BOOKSTORE</h1>
        </div>
        {/* Title */}
        <div className='md:flex justify-center items-center hidden'>
          <h1 className="text-3xl font-bold">BOOK STORE</h1>
        </div>
        {/* login link */}
        <div className='md:flex justify-end items-center gap-2 hidden'>
          <FaInstagram />
          <RiTwitterXFill />
          <FaFacebook />
          {/* Login Button */}
          <Link to={'/login'}>
            <button className='flex items-center border border-black rounded px-2 py-2 hover:bg-black hover:text-white'>
              <FaUser className='' />
              Login
            </button>
          </Link>
        </div>
      </div>
      <nav className='w-full p-3 bg-gray-900 text-white md:flex justify-center items-center'>
        {/* menubar & login */}
        <div className='flex justify-between md:hidden'>
          <button onClick={()=>setMenuState(!menuState)}>
            <GiHamburgerMenu />
          </button>
          {/* Login Button */}
          <Link to={'/login'}>
            <button className='flex items-center border border-black rounded px-2 py-2 hover:bg-black hover:text-white'>
              <FaUser className='' />
              Login
            </button>
          </Link>
        </div>
        <ul className={menuState?'flex flex-col md:flex-row md:gap-2':'md:flex justify-center items-center gap-2 hidden '}>
          <Link to={'/'}>Home</Link>
          <Link to={'/books'}>Books</Link>
          <Link to={'/career'}>Careers</Link>
          <Link to={'/contact'}>Contact</Link>
        </ul>
      </nav>


    </>
  )
}

export default Header