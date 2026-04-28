import React, { useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { useParams } from 'react-router-dom';

import { getBookByIdApi, purchaseBookApi } from '../../services/allApis';

import { loadStripe } from '@stripe/stripe-js';

import Header from '../components/Header'
import Footer from '../../components/Footer'
import { toast } from 'react-toastify';
import base_url from '../../services/base_url';

function ViewBook() {

  const [modalStatus, setModalStatus] = useState(false)
  const [bookData, setBookData] = useState({})
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getBookData()
    }
  }, [])


  const getBookData = async () => {
    const response = await getBookByIdApi(id)
    console.log(response.data)
    if (response?.status === 200) {
      setBookData(response?.data)
    }
  }

  const handlePayment = async () => {
    const stripe = await loadStripe("pk_test_51TPEI1AsVIyco09IgyAcXwzpmCB9VCUJHts1AVoH7hzLhMPQGAGJOX1SMIXDameSkdtbOsEZNfcQBd4sEZnKhHa400wgJbIQfu")
    const response = await purchaseBookApi(bookData)
    if (response.status === 200) {
      if (response.data.checkoutPaymentUrl) {
        //redirecting to payment gateway
        window.location.href = response.data?.checkoutPaymentUrl
      }
      else {
        toast.warning("Payment Gateway Error!!")
      }
    }
    else {
      toast.error("Something Went Wrong")
    }
  }

  return (
    <>
      <Header />
      <div className='min-h-[60vh] p-5'>
        <div className='border p-2 md:grid grid-cols-4'>
          <div className="col-span-1">
            <img src={bookData?.image} alt="book img"
            />
          </div>
          <div className="col-span-3">
            <h1 className='text-center font-bold'>{bookData?.title}</h1>

            <p className='text-center text-violet-600'>- {bookData?.author}</p>
            <div className='flex justify-end'>
              <button className='text-xl text-gray-500' onClick={() => { setModalStatus(true) }}>
                <FaEye />
              </button>
            </div>

            <div className='my-5 grid grid-cols-1 gap-4 md:grid-cols-3'>

              <span className='font-semibold'>Publisher : {bookData?.publisher}</span>
              <span className='font-semibold'>Language : {bookData?.language}</span>
              <span className='font-semibold'>No.Of Pages : {bookData?.noOfPages}</span>


              <span className='font-semibold'>Seller Mail : {bookData?.userMail}</span>
              <span className='font-semibold'>Real Price : {bookData?.price}&#8377;</span>
              <span className='font-semibold'>ISBN : {bookData?.isbn}</span>

            </div>

            <p className='my-5 text-justify'>
              {bookData?.abstract}
            </p>
            <div className='flex justify-end gap-5 p-4'>
              <button className='flex gap-1 items-center bg-sky-700 text-white p-3 rounded-lg shadow'>
                <MdOutlineKeyboardDoubleArrowLeft className='text-xl' />
                Back
              </button>
              <button className='bg-green-600 p-3 rounded-lg shadow text-white' onClick={handlePayment}>
                Buy <span className='text-yellow-300'>${bookData?.discountPrice}</span>
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
                    {
                      bookData?.uploadImg?.length > 0 ?
                        <>
                          {
                            bookData?.uploadImg?.map(item => (
                              <img src={`${base_url}/uploadImg/${item}`} alt="sample img"
                                width={'300px'} />
                            ))
                          }
                        </>
                        :
                        <h2 className="text-center text-red-500 text-xl">No</h2>
                    }


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