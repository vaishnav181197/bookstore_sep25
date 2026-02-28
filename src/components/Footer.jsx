import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";




function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 md:gap-9 bg-gray-900 text-white p-10'>
        <div>
          <h4 className='font-bold'>ABOUT US</h4>
          <p className='text-justify mt-5'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quo! Similique alias,
            perferendis facilis quam quia, ipsum dolorem nam iste nulla eum ipsam. Culpa fuga odio inventore exercitationem, cum aliquam!
          </p>
        </div>
        <div>
          <h4 className="font-bold">NEWSLETTER</h4>
          <p className='my-5'>Stay updated with our latest trends</p>
          <div className='flex'>
            <input type="text" placeholder='Email ID' className='p-2 placeholder-gray-500 bg-white' />
            <button className='bg-yellow-400 py-3 px-2'>
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div>
          <h4 className="font-bold">FOLLOW US</h4>
          <p className="my-5">Let us be social</p>
          <div className='flex gap-2'>
            <FaInstagram/>
            <FaFacebook/>
            <BsTwitterX/>
            <CiLinkedin/>
          </div>
        </div>
      </div>
      <div className='bg-black p-2 text-center text-white text-xs'>
          Copyright &copy; 2026 Allrights Reserved | This Website is made by <FaHeart className='inline text-yellow-500'/>  Luminar Technolab
      </div>
    </>
  )
}

export default Footer