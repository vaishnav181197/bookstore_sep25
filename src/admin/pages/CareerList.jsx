import React, { useState, useEffect } from 'react'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'

import { FaLocationDot } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import AddJobPost from '../components/AddJobPost';
import { adminListJobPostApi, adminDeleteJobPostApi, getAdminApplicationsApi, applyJobPostApi } from '../../services/allApis';
import { useContext } from 'react';
import { careerContext } from '../../contextApi/ContextApi';
import { toast } from 'react-toastify';
import base_url from '../../services/base_url';



function CareerList() {

  const [jobStatus, setJobStatus] = useState(true)
  const [applicationStatus, setApplicationStatus] = useState(false)
  const [jobList, setJobList] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const { addCareerStatus } = useContext(careerContext)
  const [applicationList, setApplicationList] = useState([])

  useEffect(() => {
    if (jobStatus) {
      getJobPosts()
    }
    if (applicationStatus) {
      getApplications()
    }
  }, [addCareerStatus, searchKey, applicationStatus])


  const getJobPosts = async () => {
    const response = await adminListJobPostApi(searchKey)
    if (response.status === 200) {
      console.log(response.data)
      setJobList(response.data)
    }
    else {
      console.log(response)
    }
  }

  const getApplications = async () => {
    const response = await getAdminApplicationsApi()
    if (response.status == 200) {
      console.log(response.data)
      setApplicationList(response.data)
    }
    else {
      console.log(response)
    }
  }

  const deleteJobPost = async (id) => {
    const response = await adminDeleteJobPostApi(id)
    if (response.status === 200) {
      getJobPosts()
    }
    else {
      console.log(response)
      toast.warning("Something Went Wrong")
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
          <h1 className="text-center text-2xl my-10">Careers</h1>
          {/* Tabs */}
          <div className='flex justify-center items-center my-5'>
            <div onClick={() => { setJobStatus(true); setApplicationStatus(false) }}
              className={jobStatus ? 'p-3 border-l border-r border-t rounded-t-sm border-gray-600 text-blue-600' :
                'p-3 border-b border-gray-600 cursor-pointer'
              }>
              Job Post
            </div>
            <div onClick={() => { setJobStatus(false); setApplicationStatus(true) }} className={applicationStatus ? 'p-3 border-l border-r border-t rounded-t-sm border-gray-600 text-blue-600' :
              'p-3 border-b border-gray-600 cursor-pointer'
            }>
              View Applicants
            </div>
          </div>
          {
            jobStatus &&
            < div className='px-10 flex justify-between'>
              <div>
                <input type="text" className='py-2 border bg-white' placeholder='Search By Title' onChange={(e) => { setSearchKey(e.target.value) }} />
                {/* <button className='bg-blue-900 text-white p-2 border border-blue-900 hover:bg-white hover:text-blue-900 hover:border'>Search</button> */}
              </div>
              <AddJobPost />
            </div>
          }

          {
            jobStatus &&
            <div className='my-5 px-10'>
              {
                jobList.length > 0 ?
                  <>
                    {
                      jobList.map(job => (
                        <div className='border-2 border-gray-500 shadow-lg py-3 mb-2 px-2 flex flex-col md:grid grid-cols-7'>
                          <div className='col-span-6'>
                            <h1 className="text-lg mb-2">{job?.title}</h1>
                            <hr />
                            <p className='mt-5 flex gap-2 items-center'><FaLocationDot className='text-blue-800' />  {job?.location}</p>
                            <p className='mt-5'>Job Type :{job?.jobType}</p>
                            <p className='mt-5'>Salary :{job?.salary}</p>
                            <p className='mt-5'>Qualification :{job?.qualification}</p>
                            <p className='mt-5'>Experience :{job?.experience}</p>
                            <p className='mt-5'>Description :{job?.description}</p>

                          </div>
                          <div className='px-4'>
                            <button className='bg-red-800 text-light p-1 float-end md:p-4 text-white md:float-start rounded-sm flex gap-1 items-center font-semibold'
                              onClick={() => { deleteJobPost(job?._id) }}>
                              Delete
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))
                    }

                  </>
                  :
                  <h2 className="text-center text-red-600">No Job Posts!</h2>
              }


            </div>
          }
          {
            applicationStatus &&
            <div className='my-5 px-10'>
              {
                applicationList.length > 0 ?
                  <table className='w-full'>
                    <thead className='bg-blue-600 text-white'>
                      <tr>
                        <th className='p-2 border border-gray-500'>SL</th>
                        <th className='p-2 border border-gray-500'>Job Title</th>
                        <th className='p-2 border border-gray-500'>Name</th>
                        <th className='p-2 border border-gray-500'>Qualification</th>
                        <th className='p-2 border border-gray-500'>Email</th>
                        <th className='p-2 border border-gray-500'>Phone</th>
                        <th className='p-2 border border-gray-500'>Cover Letter</th>
                        <th className='p-2 border border-gray-500'>Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        applicationList.map((application,index) => (
                          <tr>
                            <td className='p-2 border border-gray-500'>{index+1}</td>
                            <td className='p-2 border border-gray-500'>{application?.jobTitle}</td>
                            <td className='p-2 border border-gray-500'>{application?.fullname}</td>
                            <td className='p-2 border border-gray-500'>{application?.qualification}</td>
                            <td className='p-2 border border-gray-500'>{application?.email}</td>
                            <td className='p-2 border border-gray-500'>{application?.phone}</td>
                            <td className='p-2 border border-gray-500'>
                              {application?.coverletter}
                            </td>
                            <td className='p-2 border border-gray-500'>
                              <a href={`${base_url}/resumes/${application?.resume}`} className='underline text-blue-600'>Resume</a>
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                  :
                  <h2 className="text-center text-xl text-red-600">No Applicants Available!!</h2>
              }

            </div>
          }


        </div>
      </div >
      <Footer />
    </>
  )
}

export default CareerList