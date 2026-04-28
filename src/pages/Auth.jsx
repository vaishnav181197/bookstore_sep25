import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { signupApi, signinApi, googlesigninApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react';
import { authRoleContext } from '../contextApi/AuthContextApi';


function Auth({ register }) {

  const [user, setUser] = useState({
    username: "", email: "", password: ""
  })

  const {setRole}=useContext(authRoleContext)

  const navigate = useNavigate()

  const handleRegister = async () => {
    console.log(user)
    const { username, email, password } = user
    if (!username || !password || !email) {
      toast.info("Enter Valid Data!!")
    }
    else {
      const response = await signupApi(user)
      console.log(response)
      if (response.status === 200) {
        toast.success("Signup Successfull")
        setUser({ username: "", email: "", password: "" })
        navigate('/login')
      }
      else {
        toast.error("Signup Failed")
      }
    }
  }

  const handleLogin = async () => {
    console.log(user)
    const { email, password } = user
    if (!email || !password) {
      toast.info("Enter Valid Inputs!!")
    }
    else {
      const resposne = await signinApi(user)
      console.log(resposne)
      if (resposne.status === 200) {
        sessionStorage.setItem('token', resposne?.data?.token)
        sessionStorage.setItem('uname', resposne?.data?.username)
        sessionStorage.setItem('dp', resposne?.data?.profile)
        sessionStorage.setItem('bio', resposne?.data?.bio)
        sessionStorage.setItem('role', resposne?.data?.role)
        setRole(resposne?.data?.role)
        toast.success("Signin Successfull!!!")
        setUser({ username: "", email: "", password: "" })
        if (resposne.data?.role == "admin") {
          navigate('/admin-dashboard')
        }
        else {
          navigate('/')
        }

      }
      else {
        toast.error(resposne?.data)
      }
    }
  }

  const handleGoogleLogin = async (credential) => {
    // console.log(credential)
    const decode_value = jwtDecode(credential?.credential)
    console.log(decode_value)
    const data = { username: decode_value?.given_name, email: decode_value?.email, profile: decode_value?.picture }
    console.log(data)
    const response = await googlesigninApi(data)
    console.log(response)
    if (response.status === 200) {
      toast.success("SignIn Successfull!")
      sessionStorage.setItem('token', response?.data?.token)
      sessionStorage.setItem('uname', response?.data?.username)
      sessionStorage.setItem('dp', response?.data?.profile)
      sessionStorage.setItem('bio', response?.data?.bio)
      sessionStorage.setItem('role', response?.data?.role)
      setRole(response?.data?.role)
      navigate('/')
    }
    else {
      toast.error("SignIn Failed!!")
    }

  }

  return (
    <>
      <div className='w-screen min-h-screen bg-[url(/loginbg.jpg)] bg-cover flex flex-col items-center py-5'>
        <h1 className='text-center text-4xl font-bold'>BOOK STORE</h1>
        <div className='w-[50%] py-3 bg-gray-800 mt-5 flex flex-col items-center'>
          <FaRegUserCircle className='text-8xl text-white my-5' />
          <h1 className="text-3xl text-white">{register ? <>Register</> : <>Login</>}</h1>
          <div className='w-full my-10 px-20'>
            <input type="text" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className='w-full bg-white py-2 rounded-sm' placeholder='Email ID' value={user.email} />
            {
              register &&
              <input type="text" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} className='w-full bg-white py-2 rounded-sm mt-5' placeholder='Username' value={user.username} />

            }
            <input type="text" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className='w-full bg-white py-2 mt-5 rounded-sm' placeholder='Password' value={user.password} />
            <div className='flex justify-between text-sm'>
              <span className='text-yellow-600'>*Never share your password with orthers</span>
              {
                !register &&
                <span className='text-white underline'>Forgot Password?</span>

              }
            </div>


            {
              register ?
                <button className='w-full bg-green-700 py-2 rounded-sm text-white font-semibold mt-4' onClick={handleRegister}>Register</button>
                :
                <>
                  <button className='w-full bg-green-700 py-2 rounded-sm text-white font-semibold mt-4' onClick={handleLogin}>Login</button>
                  <p className='my-5 border-b border-white'></p>
                  
                    <div className='w-full flex justify-center'>
                      <GoogleLogin
                        onSuccess={credentialResponse => {
                          handleGoogleLogin(credentialResponse)
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                      />
                    </div>
                  

                </>
            }

          </div>
          {
            register ?
              <p className='text-white'>Already a User ? <Link className='text-blue-600 underline' to={'/login'}>Login</Link></p>
              :
              <p className='text-white'>Are you a New User ? <Link className='text-blue-600 underline' to={'/register'}>Register</Link></p>

          }

        </div>
      </div>
    </>
  )
}

export default Auth