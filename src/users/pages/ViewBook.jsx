import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";





import Header from '../components/Header'
import Footer from '../../components/Footer'

function ViewBook() {

  const [modalStatus, setModalStatus] = useState(false)

  return (
    <>
      <Header />
      <div className='min-h-[60vh] p-5'>
        <div className='border p-2 md:grid grid-cols-4'>
          <div className="col-span-1">
            <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f443d6e3-88c8-40fc-84f7-592752b655e8.png?bg_token=color.background.quaternary" alt="book img"
            />
          </div>
          <div className="col-span-3">
            <h1 className='text-center font-bold'>IKIGAI: The Japanese Secret to a Long and Happy Life</h1>

            <p className='text-center text-violet-600'>- Hector and Francesc</p>
            <div className='flex justify-end'>
              <button className='text-xl text-gray-500' onClick={() => { setModalStatus(true) }}>
                <FaEye />
              </button>
            </div>

            <div className='my-5 grid grid-cols-1 gap-4 md:grid-cols-3'>

              <span className='font-semibold'>Publisher : Penguin</span>
              <span className='font-semibold'>Language : English</span>
              <span className='font-semibold'>No.Of Pages : 208</span>


              <span className='font-semibold'>Seller Mail : penguinbooks@gmail.com</span>
              <span className='font-semibold'>Real Price : 15$</span>
              <span className='font-semibold'>ISBN : 9781786330895</span>

            </div>

            <p className='my-5 text-justify'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis veniam delectus porro sequi! Ut, porro facere corrupti ad doloribus quidem, fugit deserunt aliquid nisi aut delectus veritatis, cumque quam optio.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dicta harum pariatur. Placeat veniam architecto at debitis harum maxime rerum ea fugiat provident quis ratione praesentium, eaque, esse repellendus non!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, repellendus repellat possimus dolor dolore debitis quod veniam labore! Aspernatur corporis dignissimos odit accusantium praesentium cum animi reprehenderit, labore expedita aut!
            </p>
            <div className='flex justify-end gap-5 p-4'>
              <button className='flex gap-1 items-center bg-sky-700 text-white p-3 rounded-lg shadow'>
                <MdOutlineKeyboardDoubleArrowLeft className='text-xl' />
                Back
              </button>
              <button className='bg-green-600 p-3 rounded-lg shadow text-white'>
                Buy <span className='text-yellow-300'>10$</span>
              </button>
            </div>

          </div>
        </div>
        {
          modalStatus &&
          <div className='relative z-10' onClick={() => { setModalStatus(false) }}>
            <div className='bg-gray-500/75 fixed inset-0'>
              <div className='flex justify-center items-center min-h-screen'>
                <div style={{ height: '500px', width: '900px' }} className='bg-white rounded-2xl'>
                  <div className='bg-black text-white flex justify-between items-center p-3 rounded-t-2xl'>
                    <h1 className='text-xl'>Books Images</h1>
                    <button>
                      <IoClose />
                    </button>
                  </div>
                  <h2 className="text-lg text-blue-600 flex gap-3 items-center m-3">
                    <FaCamera />
                    Camera click of the book in the hand of seller
                  </h2>
                  {/* Images */}
                  <div className='flex gap-3 overflow-x-auto'>
                    <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f443d6e3-88c8-40fc-84f7-592752b655e8.png?bg_token=color.background.quaternary" alt="sample img"
                      width={'300px'} />
                    <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f443d6e3-88c8-40fc-84f7-592752b655e8.png?bg_token=color.background.quaternary" alt="sample img"
                      width={'300px'} />
                    <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f443d6e3-88c8-40fc-84f7-592752b655e8.png?bg_token=color.background.quaternary" alt="sample img"
                      width={'300px'} />
                    <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/f443d6e3-88c8-40fc-84f7-592752b655e8.png?bg_token=color.background.quaternary" alt="sample img"
                      width={'300px'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

      </div>
      <Footer />
    </>
  )
}

export default ViewBook