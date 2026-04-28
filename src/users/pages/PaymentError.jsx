import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentError() {
    return (
        <>
            <Header />
            <div className='min-h-[60vh]'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                        <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="payment_success"
                            width={'100%'} />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className="text-4xl text-red-700 text-center">Payment Failed!</h2>
                        <Link to={'/books'} className="px-3 py-1 my-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Explore More Books..
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentError