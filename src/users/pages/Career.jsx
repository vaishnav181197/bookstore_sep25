import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaLocationDot } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";



function Career() {
  return (
    <>
      <Header />
      <div className='min-h-[60vh] px-5 py-10 md:px-40'>
        {/* Intro */}
        <h1 className="text-4xl text-center">Career</h1>
        <p className='text-justify my-5'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias minus dolore velit laborum id reiciendis laudantium quod saepe, earum, ratione ab corrupti. Eius impedit possimus maiores odit harum error mollitia!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, placeat eos, aut corporis soluta nemo et velit ducimus incidunt sequi quaerat harum quae quis. Sequi natus quibusdam soluta debitis repellendus!
        </p>
        {/* Current Openings */}
        <div className='w-full mt-10'>
          <h1 className="text-2xl">Current Openings</h1>
          <div className='flex justify-center my-5'>
              <input type="text" className="border py-2" placeholder='Job Title'/>
              <button className='bg-green-700 text-white p-2'>Search</button>
          </div>
          {/* Job List */}
          <div className='w-full'>

              {/* Job Card */}
              <div className='border-2 border-gray-500 shadow-lg py-3 px-2 flex flex-col md:grid grid-cols-7'>
                  <div className='col-span-6'>
                    <h1 className="text-lg mb-2">Job Title</h1>
                    <hr />
                    <p className='mt-5 flex gap-2 items-center'><FaLocationDot className='text-blue-800'/>  Location</p>
                    <p className='mt-5'>Job Type :</p>
                    <p className='mt-5'>Salary :</p>
                    <p className='mt-5'>Qualification :</p>
                    <p className='mt-5'>Experience :</p>
                    <p className='mt-5'>Description :</p>

                  </div>
                  <div className='px-4'>
                    <button className='bg-blue-800 text-light p-2 float-end md:p-4 text-white md:float-start rounded-sm flex gap-1 items-center font-semibold'>
                      Apply
                      <GrShare/>
                    </button>
                  </div>
              </div>


          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}

export default Career