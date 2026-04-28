import React, { useState, useEffect } from 'react'

import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../../components/Footer'

import { FaPen } from "react-icons/fa";

import { getAdminProfileApi,adminProfileUpdateApi } from '../../services/allApis';
import base_url from '../../services/base_url';
import { toast } from 'react-toastify';
import { adminProfileContext } from '../../contextApi/ContextApi';
import { useContext } from 'react';


function Settings() {

  const [profileData, setProfileData] = useState({
  _id:"",username: "", password: "", profile: "",cpassword:""
  })
  const [preview,setPreview]=useState("")

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getProfile()
    }

  }, [])

  const {setAdminProfileStatus}=useContext(adminProfileContext)


  const getProfile = async () => {
    const response = await getAdminProfileApi()
    if (response.status === 200) {
      console.log(response.data)
      setProfileData({
        _id:response.data._id,username: response.data.username, password: response.data.password, profile: response.data.profile,cpassword:""
      })
    }
  }

  const uploadImage=(e)=>{
    const filePointer=e.target.files[0]
    setPreview(URL.createObjectURL(filePointer))
    setProfileData({...profileData,profile:filePointer})
  }


  const updateProfile=async()=>{
    console.log(profileData)
    const {profile,username,password,cpassword}=profileData
    if(!profile || !username || !password || !cpassword){
      toast.warning("Enter Valid Inputs!!")
    }
    else{
      if(password===cpassword){
        if(preview){
          const formData=new FormData()
          for(let i in profileData){
            formData.append(i,profileData[i])
          }
          const response=await adminProfileUpdateApi(formData)
          if(response.status===200){
            toast.success("Profile Updated!!")
            getProfile()
            sessionStorage.setItem('uname',username)
            sessionStorage.setItem('dp',response.data.profile)
            setAdminProfileStatus(response.data)
          }
          else{
            toast.error("Profile Updation Failed!!")
          }
        }
        else{
          const response=await adminProfileUpdateApi(profileData)
          if(response.status===200){
            toast.success("Profile Updated!!")
            getProfile()
            sessionStorage.setItem('uname',username)
            sessionStorage.setItem('dp',response.data.profile)
            setAdminProfileStatus(response.data)
          }
          else{
            toast.error("Profile Updation Failed!!")
          }
        }
      }
      else{
        toast.warning("Password Mismatches!")
      }
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
                  <img src={preview?preview:(profileData.profile?`${base_url}/uploadImg/${profileData.profile}`:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png")} alt="adminpp"
                    className='w-[60%] h-[60%] mx-auto' />
                  <label htmlFor="file">
                    <input type="file" onChange={(e)=>{uploadImage(e)}} className='hidden' id='file' />
                    <span className='bg-yellow-400 p-3 text-white rounded-sm absolute bottom-3 right-30'>
                      <FaPen />
                    </span>
                  </label>
                </div>
                <input type="text" defaultValue={profileData.username} onChange={(e)=>{setProfileData({...profileData,username:e.target.value})}} className='w-full bg-white border rounded-sm my-5 py-2' placeholder='Username' />
                <input type="text" defaultValue={profileData.password} onChange={(e)=>{setProfileData({...profileData,password:e.target.value})}} className='w-full bg-white border rounded-sm mb-5 py-2' placeholder='Password' />
                <input type="text" defaultValue={profileData.cpassword} onChange={(e)=>{setProfileData({...profileData,cpassword:e.target.value})}} className='w-full bg-white border rounded-sm mb-5 py-2' placeholder='Confirm Password' />
                <div className='mb-4 grid grid-cols-2 gap-2'>
                  <button className='bg-red-500 text-white p-3 hover:bg-white hover:border-red-500 hover:text-red-500'
                  >Reset</button>
                  <button className='bg-green-500 text-white p-3 hover:bg-white hover:border-green-500 hover:text-green-500'
                  onClick={updateProfile}>Update</button>
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