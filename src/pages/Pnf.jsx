import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className='w-[50%] h-[50%] p-3 shadow-lg'>
          <img src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-page-animation-gif-download-3299960.gif" alt="pnfimg"
            className='w-[50%] h-[50%] mx-auto' />
          <h2 className="text-center md:text-lg">Looks Like You Are Lost!</h2>
          <p className='text-center'>The Page you are looking for is not Found</p>
          <div className='flex justify-center mt-4'>
            <Link to={'/'} className='text-white bg-blue-700 p-2 rounded-lg'>Go Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pnf