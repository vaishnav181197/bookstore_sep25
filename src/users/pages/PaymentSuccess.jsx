import React from 'react'
import Footer from '../../components/Footer'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
    return (
        <>
            <Header />
            <div className='min-h-[60vh]'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                        <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="payment_success"
                            width={'100%'} />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className="text-4xl text-green-700 text-center">Payment Successfull!</h2>
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

export default PaymentSuccess