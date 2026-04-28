import React, { useState, useEffect,useRef } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaLocationDot } from "react-icons/fa6";
import { GrShare } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ListJobPostApi,applyJobPostApi } from '../../services/allApis';
import { toast } from 'react-toastify';





function Career() {

  const [modalStatus, setModalStatus] = useState(false)
  const [careerList, setCareerList] = useState([])
  const [loginStatus, setLoginStatus] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [careerData,setCareerData]=useState({
    fullname:"",qualification:"",email:"",phone:"",coverletter:"",resume:"",jobId:"",jobTitle:""
  })
  const fileInputRef=useRef()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getCareerList()
      setLoginStatus(sessionStorage.getItem('token'))
    }
    else {
      setLoginStatus("")
    }
  }, [searchKey])

  const openModal=(id,title)=>{
    setModalStatus(true)
    setCareerData({...careerData,jobId:id,jobTitle:title})
  }

  const getCareerList = async () => {
    const response = await ListJobPostApi(searchKey)
    if (response.status === 200) {
      console.log(response.data)
      setCareerList(response.data)
    }
  }

  const handleReset=()=>{
    setCareerData({
      fullname:"",qualification:"",email:"",phone:"",coverletter:"",resume:""
    })
    fileInputRef.current.value=""
  }

  const handleApplyJob=async()=>{
    console.log(careerData)
    const {fullname,qualification,email,phone,coverletter,resume,jobId,jobTitle}=careerData
    if(!fullname || !qualification || !email || !phone || !coverletter || !resume || !jobId || !jobTitle){
      toast.warning("Enter Valid Inputs")
    }
    else{
      const formData=new FormData()
      for(let i in careerData){
        formData.append(i,careerData[i])
      }
      
      const response=await applyJobPostApi(formData)
      if(response.status===200){
        toast.success("Application send!!")
        handleReset()
        setModalStatus(false)
      }
      else{
        toast.error("Something Went Wrong!!")
        console.log(response)
        if(response.data){
          toast.info(response.data)
        }
      }
    }
  }

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

          {/* Job List */}
          {
            loginStatus ?
              <div className='w-full'>
                <div className='flex justify-center my-5'>
                  <input type="search" className="border py-2 px-1" value={searchKey} placeholder='Job Title' onChange={(e)=>{setSearchKey(e.target.value)}}/>
                  {/* <button className='bg-green-700 text-white p-2'>Search</button> */}
                </div>
                {
                  careerList.length > 0 ?
                    <>
                      {
                        careerList.map(career => (
                          <div className='border-2 border-gray-500 mb-3 shadow-lg py-3 px-2 flex flex-col md:grid grid-cols-7'>
                            <div className='col-span-6'>
                              <h1 className="text-lg mb-2">{career?.title}</h1>
                              <hr />
                              <p className='mt-5 flex gap-2 items-center'><FaLocationDot className='text-blue-800' />  {career?.location}</p>
                              <p className='mt-5'>Job Type :{career?.jobType}</p>
                              <p className='mt-5'>Salary :{career?.salary}</p>
                              <p className='mt-5'>Qualification :{career?.qualification}</p>
                              <p className='mt-5'>Experience :{career?.experience}</p>
                              <p className='mt-5'>Description :{career?.description}</p>

                            </div>
                            <div className='px-4'>
                              <button className='bg-blue-800 text-light p-2 float-end md:p-4 text-white md:float-start rounded-sm flex gap-1 items-center font-semibold'
                                onClick={() =>openModal(career?._id,career?.title)}>
                                Apply
                                <GrShare />
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </>
                    :
                    <h2 className="text-center text-red-600 text-xl">No Jobs Posted Yet!</h2>
              }
                {/* Job Card */}

              </div>
              :
              <div className='min-h-[60vh] py-10 px-5 flex flex-col justify-center items-center'>
                <img src="https://img.freepik.com/free-vector/padlock-no-sign_78370-4919.jpg?semt=ais_hybrid&w=740&q=80" alt="not-login"
                  className='w-[30%]' />
                <p className='text-xl font-bold'>Please <Link to={'/login'} className='text-blue-700 underline'>Login</Link> First to Explore...</p>
              </div>

          }





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
                        <input type="text" placeholder='Full Name' value={careerData.fullname} onChange={(e)=>{setCareerData({...careerData,fullname:e.target.value})}} className='p-3 border border-gray-700 rounded-sm' />
                        <input type="text" placeholder='Qualification' value={careerData.qualification} onChange={(e)=>{setCareerData({...careerData,qualification:e.target.value})}} className='p-3 border border-gray-700 rounded-sm' />
                        <input type="text" placeholder='Email ID' value={careerData.email} onChange={(e)=>{setCareerData({...careerData,email:e.target.value})}} className='p-3 border border-gray-700 rounded-sm' />
                        <input type="text" placeholder='Phone Number' value={careerData.phone} onChange={(e)=>{setCareerData({...careerData,phone:e.target.value})}} className='p-3 border border-gray-700 rounded-sm' />
                      </div>
                      <textarea name="" placeholder='Cover Letter' value={careerData.coverletter} onChange={(e)=>{setCareerData({...careerData,coverletter:e.target.value})}} className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' id=""></textarea>
                      <div className='my-3'>
                        <label htmlFor="" className='text-lg text-gray-600'>Resume</label>
                        <input type="file" ref={fileInputRef} name="" id="" onChange={(e)=>{setCareerData({...careerData,resume:e.target.files[0]})}} className='border w-full border-gray-600 rounded-sm file:bg-gray-400 file:p-3 file:text-white' />
                      </div>
                    </div>
                    <div className='bg-gray-200 p-3 flex justify-end gap-3 rounded-b-2xl'>
                      <button className='p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-500 hover:text-red-500' onClick={handleReset}>Reset</button>
                      <button className='p-2 border rounded-sm bg-green-500 text-white hover:bg-white hover:border-green-500 hover:text-green-500' onClick={handleApplyJob}>Submit</button>
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