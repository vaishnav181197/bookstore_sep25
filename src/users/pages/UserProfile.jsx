import React, { useState } from 'react'

import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";



import Header from '../components/Header'
import Footer from '../../components/Footer'

function UserProfile() {

  const [sellStatus, setSellStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)

  return (
    <>
      <Header />
      <div className='min-h-[60vh]'>
        <div className='w-full bg-gray-900 h-[40vh] relative'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
            alt="profile_pic" className='rounded-full absolute left-5 -bottom-25' />
        </div>
        <div className='mt-30 px-5 md:px-20'>
          <div className='flex justify-between '>
            <h1 className="text-2xl">Username</h1>
            <button className='text-blue-500 border border-blue-500 rounded-sm px-3 py-2 flex items-center gap-2 hover:bg-blue-500 hover:text-white'
              onClick={() => setModalStatus(true)}>
              Edit
              <FaRegEdit />
            </button>
          </div>
          <p className='text-justify my-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime corrupti ex omnis consectetur atque assumenda delectus earum excepturi asperiores, cum cupiditate, facere vel, eum dolores fuga minus in quae sequi?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit non dolore nesciunt eos minima aut beatae? Deleniti perferendis iure provident temporibus, consectetur ullam laboriosam saepe optio modi. Nesciunt, similique explicabo.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati consequatur aperiam architecto tempore quis aliquam, tempora perspiciatis, magni minus non aliquid laboriosam assumenda vero vitae officiis temporibus molestiae officia veritatis!
          </p>
        </div>
        <div className='flex justify-center items-center my-10'>
          <div className={sellStatus ? 'p-3 border-gray-800 border-t border-l border-r rounded-t-sm text-blue-800' : 'p-3 border-b border-gray-800'}
            onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }} >
            Sell Book
          </div>
          <div className={bookStatus ? 'p-3 border-gray-800 border-t border-l border-r rounded-t-sm text-blue-800' : 'p-3 border-b border-gray-800'}
            onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }}>
            Book Status
          </div>
          <div className={purchaseStatus ? 'p-3 border-gray-800 border-t border-l border-r rounded-t-sm text-blue-800' : 'p-3 border-b border-gray-800'}
            onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }}>
            Purchase History
          </div>
        </div>
        {
          sellStatus &&
          <div className='px-5 md:px-50 mb-10'>
            <div className='bg-gray-300 p-3'>
              <h1 className="text-center my-5 text-xl">Book Details</h1>
              <div className="md:grid grid-cols-2 gap-3">
                <div>
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Title' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Author' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='No Of Pages' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Image Url' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Price' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Discount Price' />
                  <textarea name="" id="" className='w-full bg-white placeholder-gray-400 rounded-sm p-3' rows={'8'} placeholder='Abstract' >
                  </textarea>
                </div>
                <div>
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Publisher' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Language' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='ISBN' />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Category' />
                  <label htmlFor="imginp" className='flex justify-center'>
                    <input type="file" className='hidden' id='imginp' />
                    <img src="https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_1280.png" alt="fileinput"
                      className='w-[80%] cursor-pointer' />
                  </label>
                </div>
              </div>
              <div className='p-2 flex justify-end gap-3'>
                <button className='p-3 border bg-red-700 border-red-700 text-white rounded-sm hover:bg-white hover:text-red-700'>Reset</button>
                <button className='p-3 border bg-green-700 border-green-700 text-white rounded-sm hover:bg-white hover:text-green-700'>Submit</button>
              </div>
            </div>
          </div>
        }
        {
          bookStatus &&
          <div className='px-5 md:px-50 mb-10 shadow-lg border border-gray-100 p-4 flex flex-col justify-center items-center'>
            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" className='' width={'300px'} alt="no_books" />
            <h1 className="text-2xl text-red-500">No Books Added Yet</h1>
          </div>
        }
        {
          purchaseStatus &&
          <div className='px-5 md:px-50 mb-10 shadow-lg border border-gray-100 p-4 flex flex-col justify-center items-center'>
            <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" className='' width={'300px'} alt="no_books" />
            <h1 className="text-2xl text-red-500">No Books Purchased Yet</h1>
          </div>
        }

        {/* Modal For Profile Edit */}
        {
          modalStatus &&
          <div className='relative z-10' >
            <div className='bg-gray-500/75 fixed inset-0'>
              <div className='flex justify-start items-center min-h-screen'>
                <div style={{ minHeight: '100vh', width: '500px' }} className='bg-white rounded-2xl flex flex-col justify-between'>
                  <div className='bg-black text-white flex justify-between items-center p-3 rounded-t-2xl'>
                    <h1 className='text-2xl'>Edit Profile</h1>
                    <button onClick={() => setModalStatus(false)}>
                      <IoClose />
                    </button>
                  </div>
                  <div className='p-5'>
                    <label htmlFor="profile_pic" className='flex justify-center relative'>
                      <input type="file" name="" className='hidden' id="profile_pic" />
                      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""
                        className='' width={'200px'} />
                      <button className='p-2 bg-yellow-700 text-white absolute rounded bottom-5 right-35'>
                        <FaRegEdit />
                      </button>
                    </label>
                    <div className='py-5 flex flex-col gap-2'>
                      <input type="text" placeholder='UserName' className='p-3 border border-gray-700 rounded-sm w-full' />
                      <input type="text" placeholder='Password' className='p-3 border border-gray-700 rounded-sm w-full' />
                      <input type="text" placeholder='Confirm Password' className='p-3 border border-gray-700 rounded-sm w-full' />
                      <textarea name="" placeholder='Bio' className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' id=""></textarea>

                    </div>
                    
                  </div>
                  <div className='bg-gray-200 p-3 flex justify-end gap-3 rounded-b-2xl'>
                    <button className='p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-500 hover:text-red-500'>Reset</button>
                    <button className='p-2 border rounded-sm bg-green-500 text-white hover:bg-white hover:border-green-500 hover:text-green-500'>Submit</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Footer />
    </>
  )
}

export default UserProfile