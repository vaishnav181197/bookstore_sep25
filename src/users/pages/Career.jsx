import React,{useState} from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaLocationDot } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { IoClose } from "react-icons/io5";




function Career() {

  const [modalStatus,setModalStatus]=useState(false)

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
            <input type="text" className="border py-2" placeholder='Job Title' />
            <button className='bg-green-700 text-white p-2'>Search</button>
          </div>
          {/* Job List */}
          <div className='w-full'>

            {/* Job Card */}
            <div className='border-2 border-gray-500 shadow-lg py-3 px-2 flex flex-col md:grid grid-cols-7'>
              <div className='col-span-6'>
                <h1 className="text-lg mb-2">Job Title</h1>
                <hr />
                <p className='mt-5 flex gap-2 items-center'><FaLocationDot className='text-blue-800' />  Location</p>
                <p className='mt-5'>Job Type :</p>
                <p className='mt-5'>Salary :</p>
                <p className='mt-5'>Qualification :</p>
                <p className='mt-5'>Experience :</p>
                <p className='mt-5'>Description :</p>

              </div>
              <div className='px-4'>
                <button className='bg-blue-800 text-light p-2 float-end md:p-4 text-white md:float-start rounded-sm flex gap-1 items-center font-semibold'
                onClick={()=>setModalStatus(true)}>
                  Apply
                  <GrShare />
                </button>
              </div>
            </div>


          </div>

          {
            modalStatus &&
            <div className='relative z-10' >
              <div className='bg-gray-500/75 fixed inset-0'>
                <div className='flex justify-center items-center min-h-screen'>
                  <div style={{ minHeight: '400px', width: '500px' }} className='bg-white rounded-2xl'>
                    <div className='bg-black text-white flex justify-between items-center p-3 rounded-t-2xl'>
                      <h1 className='text-2xl'>Application Form</h1>
                      <button onClick={() => setModalStatus(false)}>
                        <IoClose />
                      </button>
                    </div>
                    <div className='p-5'>
                      <div className='grid grid-cols-2 gap-4 mb-5'>
                        <input type="text" placeholder='Full Name' className='p-3 border border-gray-700 rounded-sm' />
                        <input type="text" placeholder='Qualification' className='p-3 border border-gray-700 rounded-sm' />
                        <input type="text" placeholder='Email ID' className='p-3 border border-gray-700 rounded-sm' />
                        <input type="text" placeholder='Phone Number' className='p-3 border border-gray-700 rounded-sm' />
                      </div>
                      <textarea name="" placeholder='Cover Letter' className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' id=""></textarea>
                      <div className='my-3'>
                        <label htmlFor="" className='text-lg text-gray-600'>Resume</label>
                        <input type="file" name="" id="" className='border w-full border-gray-600 rounded-sm file:bg-gray-400 file:p-3 file:text-white'/>
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

      </div>
      <Footer />
    </>
  )
}

export default Career