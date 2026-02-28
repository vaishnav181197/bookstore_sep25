import React from 'react'

function Preloader() {
  return (
    <>
    <div className='flex justify-center items-center min-h-[100vh] bg-blue-300'>
        <img src="https://cdn.dribbble.com/userupload/20666161/file/original-bbbab00152e56a800d901fa190f9442d.gif" 
        alt="no-image" className='img-fluid' height={'35%'} width={'35%'}/>
    </div>
    </>
  )
}

export default Preloader