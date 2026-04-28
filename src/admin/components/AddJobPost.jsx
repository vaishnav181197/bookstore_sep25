import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { adminAddJobPostApi } from '../../services/allApis';
import { useContext } from 'react';
import { careerContext } from '../../contextApi/ContextApi';

function AddJobPost() {
    const [modalStatus, setModalStatus] = useState(false)
    const [jobData,setJobData]=useState({
        title:"",location:"",jobType:"",salary:"",experience:"",qualification:"",description:""
    })
    const {setAddCareerStatus}=useContext(careerContext)

    const handleReset=()=>{
        setJobData({
             title:"",location:"",jobType:"",salary:"",experience:"",qualification:"",description:""
        })
    }

    const handleSubmit=async()=>{
        console.log(jobData)
        const {title,location,jobType,salary,experience,qualification,description}=jobData
        if(!title || !location || !jobType || !salary || !experience || !qualification || !description){
            toast.warning("Enter Valid Inputs")
        }
        else{
            const response=await adminAddJobPostApi(jobData)
            if(response.status===200){
                toast.success("Job Post Added!!")
                handleReset()
                setModalStatus(false)
                setAddCareerStatus(response)
            }
            else{
                console.log(response)
                toast.error("Something Went Wrong!!")
                if(response?.data){
                    toast.info(response?.data)
                }
            }
        }
    }

    return (
        <>
            <button className='bg-green-800 text-white p-2 border border-green-800 rounded-sm hover:bg-white hover:text-green-800'
                onClick={() => { setModalStatus(true) }}>
                Add Job +
            </button>

            {
                modalStatus &&
                <div className='relative z-10' >
                    <div className='bg-gray-500/75 fixed inset-0'>
                        <div className='flex justify-center items-center min-h-screen'>
                            <div style={{ minHeight: '500px', width: '500px' }} className='bg-white rounded-2xl'>
                                <div className='bg-black text-white flex justify-between items-center p-3 rounded-t-2xl'>
                                    <h1 className='text-xl'>Application Form</h1>
                                    <button onClick={() => setModalStatus(false)}>
                                        <IoClose />
                                    </button>
                                </div>
                                <div className='p-2'>
                                    <input type="text" placeholder='Job Title' value={jobData.title} onChange={(e)=>{setJobData({...jobData,title:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' />
                                    <input type="text" placeholder='Location' value={jobData.location} onChange={(e)=>{setJobData({...jobData,location:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' />
                                    <input type="text" placeholder='Job Type' value={jobData.jobType} onChange={(e)=>{setJobData({...jobData,jobType:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' />
                                    <input type="text" placeholder='Salary' value={jobData.salary} onChange={(e)=>{setJobData({...jobData,salary:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' />
                                    <input type="text" placeholder='Qualification' value={jobData.qualification} onChange={(e)=>{setJobData({...jobData,qualification:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' />
                                    <input type="text" placeholder='Experience' value={jobData.experience} onChange={(e)=>{setJobData({...jobData,experience:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' />
                                    <textarea name="" placeholder='Description' value={jobData.description} onChange={(e)=>{setJobData({...jobData,description:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' id=""></textarea>
                                </div>
                                <div className='bg-gray-200 p-3 flex justify-end gap-3 rounded-b-2xl'>
                                    <button className='p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-500 hover:text-red-500'
                                    onClick={handleReset}>Reset</button>
                                    <button className='p-2 border rounded-sm bg-green-500 text-white hover:bg-white hover:border-green-500 hover:text-green-500'
                                    onClick={handleSubmit}>Add</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default AddJobPost