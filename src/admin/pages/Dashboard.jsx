import React from 'react'

import { FaBook } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";




import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSidebar from '../components/AdminSidebar'

function Dashboard() {
  return (
    <>
      <AdminHeader />
      <div className='min-h-[60vh] md:grid grid-cols-4'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-3'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
            
            <div className='w-full bg-violet-600 py-10 text-white rounded-xl shadow'>
              <h1 className="text-xl justify-center flex gap-3 items-center">
                <FaBook/>
                Total Number of Books
              </h1>
              <h1 className="text-center text-lg font-bold">100+</h1>
            </div>
            
            <div className='w-full bg-green-600 py-10 text-white rounded-xl shadow'>
              <h1 className="text-xl justify-center flex gap-3 items-center">
                <FaUsers/>
                Total Number of Users
              </h1>
              <h1 className="text-center text-lg font-bold">100+</h1>
            </div>
            
            <div className='w-full bg-yellow-600 py-10 text-white rounded-xl shadow'>
              <h1 className="text-xl justify-center flex gap-3 items-center">
                <GrUserWorker/>
                Total Number of Employees
              </h1>
              <h1 className="text-center text-lg font-bold">100+</h1>
            </div>

          </div>

          <div className='md:grid grid-cols-2'>
              <div>
                Graph
              </div>
              <div>
                PieChart
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard