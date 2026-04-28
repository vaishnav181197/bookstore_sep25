import React, { useState, useEffect } from 'react'

import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

import { getProfileApi, profileUpdateAPi } from '../../services/allApis';
import base_url from '../../services/base_url';
import { profileContext } from '../../contextApi/ContextApi';
import { useContext } from 'react';

function Edit() {
    const [modalStatus, setModalStatus] = useState(false)
    const [profileData, setProfileData] = useState({
        username: "", password: "", cpassword: "", profile: "", bio: "", role: ""
    })
    const [preview, setPreview] = useState("")
    const {profileStatus,setProfileStatus}=useContext(profileContext)

    useEffect(() => {
        if (sessionStorage.getItem('token') && modalStatus) {
            getProfiledata()
        }
    }, [modalStatus])

    const getProfiledata = async () => {
        const response = await getProfileApi()
        if (response.status === 200) {
            console.log(response.data)
            const user = response.data
            setProfileData({
                username: user?.username, password: user?.password, cpassword: user?.password, profile: user?.profile, bio: user?.bio, role: user?.role
            })
        }
    }

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0]
        const previewUrl = URL.createObjectURL(imageFile)
        setPreview(previewUrl)
        setProfileData({ ...profileData, profile: imageFile })
    }


    const handleSubmit = async () => {
        // console.log(profileData)
        const { username, password, cpassword, bio, profile } = profileData
        if (!username || !password || !cpassword || !bio) {
            toast.warning("Enter Valid Inputs")
        }
        else {
            if (password !== cpassword) {
                toast.error("Passwords mismatches!")
            }
            else {
                const formData = new FormData()
                if (preview) {
                    for (let key in profileData) {
                        formData.append(key, profileData[key])
                    }
                    
                    const response = await profileUpdateAPi(formData)
                    console.log(response)
                    if (response.status === 200) {
                        toast.success("Profile Updated Successfully!")
                        getProfiledata()
                        const userData=response.data
                        sessionStorage.setItem('uname',userData?.username)
                        sessionStorage.setItem('bio',userData?.bio)
                        sessionStorage.setItem('dp',userData?.profile)
                        setProfileStatus(userData)
                        setModalStatus(false)
                    }
                    else {
                        toast.error("Something Went Wrong!")
                    }
                }
                else {
                    const response = await profileUpdateAPi(profileData)
                    console.log(response)
                    if (response.status === 200) {
                        toast.success("Profile Updated Successfully!")
                        getProfiledata()
                        const userData=response.data
                        sessionStorage.setItem('uname',userData?.username)
                        sessionStorage.setItem('bio',userData?.bio)
                        sessionStorage.setItem('dp',userData?.profile)
                        setProfileStatus(userData)
                        setModalStatus(false)
                    }
                    else {
                        toast.error("Something Went Wrong!")
                    }
                }
            }
        }
    }

    return (
        <>
            <button className='text-blue-500 border border-blue-500 rounded-sm px-3 py-2 flex items-center gap-2 hover:bg-blue-500 hover:text-white'
                onClick={() => setModalStatus(true)}>
                Edit
                <FaRegEdit />
            </button>
            {
                modalStatus &&
                <div className='relative z-10' >
                    <div className='bg-gray-500/75 fixed inset-0'>
                        <div className='flex justify-start items-center min-h-screen'>
                            <div style={{ minHeight: '100vh', width: '500px' }} className='bg-white rounded-2xl flex flex-col justify-between'>
                                <div className='bg-black text-white flex justify-between items-center p-3 rounded-t-2xl'>
                                    <h1 className='text-2xl'>Edit Profile</h1>
                                    <button onClick={() => setModalStatus(false)}>
                                        <IoClose />
                                    </button>
                                </div>
                                <div className='p-5'>
                                    <label htmlFor="profile_pic" className='flex justify-center relative'>
                                        <input type="file" name="" className='hidden' id="profile_pic" onChange={(e) => { handleImageUpload(e) }} />
                                        {
                                            preview ?
                                                <img src={preview} alt="no-image"
                                                    className='' width={'200px'} />
                                                :
                                                <img src={profileData.profile ? (profileData.profile.startsWith("https://lh3.googleusercontent.com") ? profileData.profile : `${base_url}/uploadImg/${profileData.profile}`) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"} alt="no-image"
                                                    className='' width={'200px'} />
                                        }

                                        <button className='p-2 bg-yellow-700 text-white absolute rounded bottom-5 right-35'>
                                            <FaRegEdit />
                                        </button>
                                    </label>
                                    <div className='py-5 flex flex-col gap-2'>
                                        <input type="text" placeholder='UserName' defaultValue={profileData.username} onChange={(e) => { setProfileData({ ...profileData, username: e.target.value }) }} className='p-3 border border-gray-700 rounded-sm w-full' />
                                        <input type="text" placeholder='text' defaultValue={profileData.password} onChange={(e) => { setProfileData({ ...profileData, password: e.target.value }) }} className='p-3 border border-gray-700 rounded-sm w-full' />
                                        <input type="password" placeholder='Confirm Password' defaultValue={profileData.cpassword} onChange={(e) => { setProfileData({ ...profileData, cpassword: e.target.value }) }} className='p-3 border border-gray-700 rounded-sm w-full' />
                                        <textarea name="" placeholder='Bio' className='p-2 border bg-white placeholder-gray-600 rounded-sm w-full mb-2' id="" onChange={(e) => { setProfileData({ ...profileData, bio: e.target.value }) }}>{profileData.bio}</textarea>

                                    </div>

                                </div>
                                <div className='bg-gray-200 p-3 flex justify-end gap-3 rounded-b-2xl'>
                                    <button className='p-2 border rounded-sm bg-red-500 text-white hover:bg-white hover:border-red-500 hover:text-red-500'>Reset</button>
                                    <button className='p-2 border rounded-sm bg-green-500 text-white hover:bg-white hover:border-green-500 hover:text-green-500' onClick={handleSubmit}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Edit