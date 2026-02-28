import React from 'react'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'

import { FaPen } from "react-icons/fa";


function Settings() {
  return (
    <>
      <AdminHeader />
      <div className='min-h-[60vh] md:grid grid-cols-4'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-3'>
          <h1 className="text-center text-3xl my-5">Admin Settings</h1>
          <div className='md:grid grid-cols-2'>
            <div className='p-2'>
              <p className='text-justify'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus doloremque amet similique nostrum voluptas debitis a, beatae adipisci quis. Quos recusandae delectus quaerat, natus illum architecto sequi libero reprehenderit voluptatem.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus tempore assumenda rem dolor itaque officia ab fugit, saepe facilis temporibus reiciendis. Eaque, maiores sed delectus suscipit velit porro nulla doloremque
              </p>
              <p className='text-justify mt-2'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus doloremque amet similique nostrum voluptas debitis a, beatae adipisci quis. Quos recusandae delectus quaerat, natus illum architecto sequi libero reprehenderit voluptatem.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus tempore assumenda rem dolor itaque officia ab fugit, saepe facilis temporibus reiciendis. Eaque, maiores sed delectus suscipit velit porro nulla doloremque
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut accusamus aut exercitationem distinctio possimus vel, veritatis necessitatibus quasi laudantium suscipit labore molestiae. Quisquam repellat modi suscipit? Pariatur dolorum sint possimus?
              </p>
            </div>
            <div className='p-2'>
              <div className='w-full h-full bg-sky-300 py-4 px-3'>
                <div className='relative'>
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="adminpp"
                    className='w-[60%] h-[60%] mx-auto' />
                  <label htmlFor="file">
                    <input type="file" className='hidden' id='file'/>
                    <span className='bg-yellow-400 p-3 text-white rounded-sm absolute bottom-3 right-30'>
                      <FaPen />
                    </span>
                  </label>
                </div>
                <input type="text" className='w-full bg-white border rounded-sm my-5 py-2' placeholder='Username' />
                <input type="text" className='w-full bg-white border rounded-sm mb-5 py-2' placeholder='Password'/>
                <input type="text" className='w-full bg-white border rounded-sm mb-5 py-2' placeholder='Confirm Password'/>
                <div className='mb-4 grid grid-cols-2 gap-2'>
                  <button className='bg-red-500 text-white p-3 hover:bg-white hover:border-red-500 hover:text-red-500'>Reset</button>
                  <button className='bg-green-500 text-white p-3 hover:bg-white hover:border-green-500 hover:text-green-500'>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Settings