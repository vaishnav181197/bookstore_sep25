import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'



function BookList() {

  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)

  return (
    <>
      <AdminHeader />
      <div className='min-h-[60vh] md:grid grid-cols-4'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-3'>

          <h2 className="text-center text-2xl my-5">Resources</h2>

          <div className='flex justify-center items-center'>
            <div onClick={() => { setBookStatus(true); setUserStatus(false) }}
              className={bookStatus ? 'p-3 border-t border-l border-r rounded-t-sm text-blue-600 border-gray-700' : 'p-3 border-b'}  >
              All Books
            </div>
            <div onClick={() => { setBookStatus(false); setUserStatus(true) }}
              className={userStatus ? 'p-3 border-t border-l border-r rounded-t-sm text-blue-600 border-gray-700' : 'p-3 border-b'}  >
              Users
            </div>
          </div>
          {
            bookStatus &&

            <div className='px-10 py-5 flex flex-wrap justify-around gap-4'>
              {/* Card */}
              <div className="p-1 w-[70%] md:w-[16rem] shadow-xl text-center">
                <Link to={'/books/1/view'}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BcwZA2Yywvg9JTtIv4sMHDAFUeW4jymQ7g&s" alt="bookimg"
                    style={{ height: "300px", width: '100%' }} />
                </Link>
                <h2 className="text-lg">Hunger Games</h2>
                <p>Lorem ipsum ...</p>
                <h4 className="text-lg text-blue-600">$40</h4>
                <button className='bg-green-600 text-white border border-green-600 w-full py-2 hover:bg-white hover:text-green-500'>Approve</button>
              </div>
              {/* Card */}
              <div className="p-1 w-[70%] md:w-[16rem] shadow-xl text-center">
                <Link to={'/books/1/view'}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BcwZA2Yywvg9JTtIv4sMHDAFUeW4jymQ7g&s" alt="bookimg"
                    style={{ height: "300px", width: '100%' }} />
                </Link>
                <h2 className="text-lg">Hunger Games</h2>
                <p>Lorem ipsum ...</p>
                <h4 className="text-lg text-blue-600">$40</h4>
                <button className='bg-green-600 text-white border border-green-600 w-full py-2 hover:bg-white hover:text-green-500'>Approve</button>
              </div>
            </div>
          }

          {
            userStatus &&

            <div className='px-10 py-5 flex flex-wrap justify-around gap-4'>
              
              {/* UserCard */}
              <div className='max-w-[16rem] border bg-gray-300 py-2 px-4'>
                  <h1 className="text-center my-5 text-amber-900">ID : qjbd9876543456789</h1>
                  <div className='grid grid-cols-3 gap-3'>
                      <div className='col-span-1'>
                          <img src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                           alt="userPic" width={'150px'} />
                      </div>
                      <div className='col-span-2 flex flex-col justify-center'>
                          <h2 className="text-blue-800 text-lg">Username</h2>
                          <p className='text-green-800'>usermail@gmail.com</p>
                      </div>
                  </div>
              </div>
              {/* UserCard */}
              <div className='max-w-[16rem] border bg-gray-300 py-2 px-4'>
                  <h1 className="text-center my-5 text-amber-900">ID : qjbd9876543456789</h1>
                  <div className='grid grid-cols-3 gap-3'>
                      <div className='col-span-1'>
                          <img src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                           alt="userPic" width={'150px'} />
                      </div>
                      <div className='col-span-2 flex flex-col justify-center'>
                          <h2 className="text-blue-800 text-lg">Username</h2>
                          <p className='text-green-800'>usermail@gmail.com</p>
                      </div>
                  </div>
              </div>
              {/* UserCard */}
              <div className='max-w-[16rem] border bg-gray-300 py-2 px-4'>
                  <h1 className="text-center my-5 text-amber-900">ID : qjbd9876543456789</h1>
                  <div className='grid grid-cols-3 gap-3'>
                      <div className='col-span-1'>
                          <img src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                           alt="userPic" width={'150px'} />
                      </div>
                      <div className='col-span-2 flex flex-col justify-center'>
                          <h2 className="text-blue-800 text-lg">Username</h2>
                          <p className='text-green-800'>usermail@gmail.com</p>
                      </div>
                  </div>
              </div>
              {/* UserCard */}
              <div className='max-w-[16rem] border bg-gray-300 py-2 px-4'>
                  <h1 className="text-center my-5 text-amber-900">ID : qjbd9876543456789</h1>
                  <div className='grid grid-cols-3 gap-3'>
                      <div className='col-span-1'>
                          <img src="https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                           alt="userPic" width={'150px'} />
                      </div>
                      <div className='col-span-2 flex flex-col justify-center'>
                          <h2 className="text-blue-800 text-lg">Username</h2>
                          <p className='text-green-800'>usermail@gmail.com</p>
                      </div>
                  </div>
              </div>

            </div>
          }



        </div>
      </div>
      <Footer />
    </>
  )
}

export default BookList