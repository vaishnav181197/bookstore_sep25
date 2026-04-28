import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import base_url from '../../services/base_url';
import { useContext } from 'react';
import { profileContext } from '../../contextApi/ContextApi';
import { authRoleContext } from '../../contextApi/AuthContextApi';





function Header() {

  const [menuState, setMenuState] = useState(false)
  const [username, setUsername] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [dropddownStatus, setDropDownStatus] = useState(false)
  const navigate = useNavigate()
  const { profileStatus, setProfileStatus } = useContext(profileContext)
  const {setRole}=useContext(authRoleContext)
  useEffect(() => {
    if (sessionStorage.getItem('uname')) {
      setUsername(sessionStorage.getItem('uname'))
      setProfilePicture(sessionStorage.getItem('dp'))

    }
    else {
      setUsername("")
    }
  }, [profileStatus])

  const signout = () => {
    sessionStorage.clear()
    setUsername("")
    setProfilePicture("")
    setDropDownStatus(false)
    setRole("")
    navigate('/')
  }

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
          {
            username ?
              <div className='flex relative'>
                <button className='px-2 py-1 border-3 rounded-lg flex gap-3 items-center' onClick={() => { setDropDownStatus(!dropddownStatus) }}>
                  <img src={profilePicture ? (profilePicture.startsWith("https://lh3.googleusercontent.com") ? profilePicture :
                    `${base_url}/uploadImg/${profilePicture}`) :
                    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ7dQ5JTVU2angWE_N-wn6oQitMHustA1GpbQAFs3o3RtL3saxf"}
                    alt="profilelogo" width={'50px'} className='rounded-full' />
                  {username}
                </button>
                {
                  dropddownStatus &&
                  <ul className='border text-sm absolute right-0 z-10  rounded-md bg-white -bottom-15'>
                    <li className='border-b px-2 py-1'><Link to={'/user-profile'}>Profile</Link></li>
                    <li className='px-2 py-1'>
                      <button className='text-red-600 cursor-pointer' onClick={signout}>Sign Out</button>
                    </li>
                  </ul>
                }


              </div>
              :
              <>
                <Link to={'/login'}>
                  <button className='flex items-center border border-black rounded px-2 py-2 hover:bg-black hover:text-white'>
                    <FaUser className='' />
                    Login
                  </button>
                </Link>
              </>
          }

        </div>
      </div>
      <nav className='w-full p-3 bg-gray-900 text-white md:flex justify-center items-center'>
        {/* menubar & login */}
        <div className='flex justify-between md:hidden'>
          <button onClick={() => setMenuState(!menuState)}>
            <GiHamburgerMenu />
          </button>
          {/* Login Button */}
          {
            username ?
              <div className='flex relative'>
                <button className='px-2 py-1 border-3 rounded-lg flex gap-3 items-center' onClick={() => { setDropDownStatus(!dropddownStatus) }}>
                  <img src={profilePicture ? (profilePicture.startsWith("https://lh3.googleusercontent.com") ? profilePicture :
                    `${base_url}/uploadImg/${profilePicture}`) :
                    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ7dQ5JTVU2angWE_N-wn6oQitMHustA1GpbQAFs3o3RtL3saxf"}
                    alt="profilelogo" width={'50px'} className='rounded-full' />
                  {username}
                </button>
                {
                  dropddownStatus &&
                  <ul className='border text-sm absolute right-0 z-10  rounded-md bg-white -bottom-15'>
                    <li className='border-b px-2 py-1'><Link to={'/user-profile'} className='text-black'>Profile</Link></li>
                    <li className='px-2 py-1'>
                      <button className='text-red-600 cursor-pointer' onClick={signout}>Sign Out</button>
                    </li>
                  </ul>
                }


              </div>
              :
              <Link to={'/login'}>
                <button className='flex items-center border border-black rounded px-2 py-2 hover:bg-black hover:text-white'>
                  <FaUser className='' />
                  Login
                </button>
              </Link>
          }

        </div>
        <ul className={menuState ? 'flex flex-col md:flex-row md:gap-2' : 'md:flex justify-center items-center gap-2 hidden '}>
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