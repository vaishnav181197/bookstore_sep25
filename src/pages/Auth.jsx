import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Auth({ register }) {
  console.log(register)
  return (
    <>
      <div className='w-screen min-h-screen bg-[url(/loginbg.jpg)] bg-cover flex flex-col items-center py-5'>
        <h1 className='text-center text-4xl font-bold'>BOOK STORE</h1>
        <div className='w-[50%] py-3 bg-gray-800 mt-5 flex flex-col items-center'>
          <FaRegUserCircle className='text-8xl text-white my-5' />
          <h1 className="text-3xl text-white">{register ?<>Register</> : <>Login</>}</h1>
          <div className='w-full my-10 px-20'>
            <input type="text" className='w-full bg-white py-2 rounded-sm' placeholder='Email ID' />
            {
              register &&
              <input type="text" className='w-full bg-white py-2 rounded-sm mt-5' placeholder='Username' />

            }
            <input type="text" className='w-full bg-white py-2 mt-5 rounded-sm' placeholder='Password' />
            <div className='flex justify-between text-sm'>
              <span className='text-yellow-600'>*Never share your password with orthers</span>
              {
                !register &&
                <span className='text-white underline'>Forgot Password?</span>

              }
            </div>


            {
              register ?
                <button className='w-full bg-green-700 py-2 rounded-sm text-white font-semibold mt-4'>Register</button>
                :
                <button className='w-full bg-green-700 py-2 rounded-sm text-white font-semibold mt-4'>Login</button>
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