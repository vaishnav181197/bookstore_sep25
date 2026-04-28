import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'
import base_url from '../../services/base_url'
import { getAdminAllBooksApi, getAdminAllUsersApi,adminApproveBookApi } from '../../services/allApis'
import { toast } from 'react-toastify'



function BookList() {

  const [bookStatus, setBookStatus] = useState(true)
  const [userStatus, setUserStatus] = useState(false)
  const [bookList, setBookList] = useState([])
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (bookStatus) {
      getBookList()
    }
    if (userStatus) {
      getUserList()
    }
  }, [userStatus])

  const getBookList = async () => {
    const response = await getAdminAllBooksApi()
    if (response.status === 200) {
      console.log(response.data)
      setBookList(response.data)
    }
    else {
      console.log(response)
    }
  }

  const getUserList = async () => {
    const response = await getAdminAllUsersApi()
    if (response.status === 200) {
      console.log(response.data)
      setUserList(response.data)
    }
    else {
      console.log(response)
    }
  }

  const handleBookApproval=async(id)=>{
    const response=await adminApproveBookApi(id)
    if(response.status===200){
      toast.success("Book Approved!!")
      getBookList()
    }
    else{
      console.log(response)
      toast.error("Something Went Wrong!!")
    }
  }

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
              {
                bookList.length > 0 ?
                  <>
                    {
                      bookList.map(item => (
                        <div className="p-1 w-[70%] md:w-[16rem] shadow-xl text-center">
                          <img src={item?.image} alt="bookimg"
                            style={{ height: "300px", width: '100%' }} />

                          <h2 className="text-lg">{item?.title}</h2>
                          <p>{item?.abstract.slice(0, 10)} ...</p>
                          <h4 className="text-lg text-blue-600">&#8377;{item?.price}</h4>
                          {
                            item?.status == "pending" ?
                              <button onClick={()=>{handleBookApproval(item?._id)}} className='bg-green-600 text-white border border-green-600 w-full py-2 hover:bg-white hover:text-green-500'>Approve</button>
                              :
                              <h2 className='text-green-600 text-center'>Approved</h2>

                          }
                        </div>
                      ))
                    }
                  </>
                  :
                  <h2 className="m-5 text-center text-red-600 text-xl">No Books Available</h2>
              }


            </div>
          }

          {
            userStatus &&

            <div className='px-10 py-5 flex flex-wrap justify-around gap-4'>
              {
                userList.length > 0 ?
                  <>
                    {
                      userList.map(item => (
                        <div className='min-w-[16rem] border bg-gray-300 py-2 px-4'>
                          <h1 className="text-center my-5 text-amber-900">ID : {item?._id}</h1>
                          <div className='grid grid-cols-3 gap-3'>
                            <div className='col-span-1'>
                              <img src={item.profile ? (item.profile.startsWith("https://lh3.googleusercontent.com") ? item.profile :
                                `${base_url}/uploadImg/${item.profile}`) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"}
                                alt="userPic" width={'150px'} height={'200px'} />
                            </div>
                            <div className='col-span-2 flex flex-col justify-center' >
                              <h2 className="text-blue-800 text-lg">{item?.username}</h2>
                              <p className='text-green-800'>{item?.email}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                  </>
                  :
                  <h2 className="text-center text-red-600 text-xl">No Users Available!!</h2>
              }



            </div>
          }



        </div>
      </div>
      <Footer />
    </>
  )
}

export default BookList