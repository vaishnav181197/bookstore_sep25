import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { homeBookApi } from '../../services/allApis';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { searchContext } from '../../contextApi/ContextApi';

function Home() {

  const [homeBooks, setHomeBooks] = useState([])

  const { globalSearchKey, setGlobalSearchKey } = useContext(searchContext)


  useEffect(() => {
    getHomeBooks()
  }, [])

  const navigate = useNavigate()


  const getHomeBooks = async () => {
    const response = await homeBookApi()
    if (response.status === 200) {
      console.log(response.data)
      setHomeBooks(response.data)
    }
  }

  const gotoBooks = () => {
    navigate('/books')
  }



  return (
    <>
      <Header />
      <>
        {/* Hero */}
        <section className="w-full h-[70vh] bg-[url(/bghero.jpg)] bg-cover bg-center bg-fixed">
          <div className="w-full h-[70vh] bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
            <div className="w-[50%] flex flex-col items-center text-white text-center">
              <h1 className="text-5xl">Wonderful Gifts</h1>
              <h2 className="text-2xl">Give your family and friends a book</h2>
              <div className="mt-5 w-[60%] flex items-center relative">
                <input type="text" placeholder="Search Books" className="placeholder-gray-700 text-black w-full bg-white rounded-full py-2" 
                onChange={(e)=>{setGlobalSearchKey(e.target.value)}}/>
                <FaMagnifyingGlass className="text-blue-950 absolute right-5" onClick={gotoBooks} />
              </div>
            </div>
          </div>
        </section>
        {/* New Arrivals */}
        <section className="my-3 px-5 md:px-40">
          <h1 className="text-center text-2xl">New Arrivals</h1>
          <h1 className="text-center text-4xl">Explore Our Latest Collection</h1>
          <div className="w-full mt-5 flex flex-col items-center md:flex-row md:justify-center gap-4 ">
            {
              homeBooks.length > 0 ?
                <>
                  {
                    homeBooks.map(item => (
                      < div className="p-1 w-[70%] md:w-[16rem] shadow-xl text-center" >
                        <img src={item?.image} alt="bookimg"
                          style={{ height: "300px", width: '100%' }} />
                        <h2 className="text-lg">{item?.title.slice(0, 12)}...</h2>
                        <h4 className="text-lg text-blue-600">{item?.price}</h4>
                      </div>
                    ))
                  }

                </>
                :
                <h1 className="text-center text-red-700">No Books Available!</h1>
            }



          </div>
          <div className="mt-5 flex justify-center">
            <Link to={'/books'} className="px-3 bg-blue-900 text-white py-2">Explore More..</Link>
          </div>
        </section >
        {/* Featured Authors */}
        < section className='my-20 px-5 md:px-40 grid md:grid-cols-2 gap-10' >
          <div>
            <h1 className="text-xl text-center">FEATURED AUTHORS</h1>
            <h1 className="text-3xl text-center">Captivates with every word</h1>
            <p className='text-justify mt-3'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint tempore voluptatum aliquid et ipsum, vel, quae ipsa, error similique eius soluta facilis nisi ad deleniti dolorum? Architecto totam doloremque dicta?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ipsum quos dolores, nulla cupiditate adipisci necessitatibus beatae? Nisi nostrum expedita error repudiandae ad totam, et veritatis deserunt minus, vero molestias?
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est incidunt possimus iste, exercitationem ut, tenetur ratione ipsum optio, delectus illo consectetur ducimus nemo corrupti mollitia. Voluptatum in sit laborum necessitatibus.
            </p>
            <p className='text-justify mt-3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ullam saepe veritatis. Temporibus sunt fuga nisi ex odit, consequuntur voluptatum minus architecto vel, esse mollitia reiciendis qui voluptate molestias unde?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, quisquam unde! Voluptate culpa natus dolorem, ipsam consequatur voluptas velit libero dolores ipsa pariatur ut optio veniam dolorum, enim vitae eaque!
            </p>
          </div>
          <div className='flex items-center'>
            <img src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg" alt="author"
              className='w-full' />
          </div>
        </section >
        {/* Testimonies */}
        < section className='text-center my-20 px-5 md:px-40' >
          <h1 className="text-lg">TESTIMONIALS</h1>
          <h1 className="text-3xl">See What Others Are Saying</h1>
          <div className='flex flex-col items-center my-5'>
            <img src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=" alt="testimonial"
              className='rounded-full mt-5' style={{ height: '200px', width: '200px' }} />
            <h2>John Doe</h2>
          </div>
          <p className='text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, reprehenderit autem doloremque voluptatum assumenda dignissimos deleniti a dolorum sunt maiores et, iure enim minima architecto harum numquam voluptatibus. Quas, architecto?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repellat iure eligendi quo error perspiciatis nisi vero corporis tenetur placeat, sit exercitationem dolorum eos cumque molestiae sint assumenda necessitatibus dolores.
          </p>
        </section >
      </>
      <Footer />
    </>
  )
}

export default Home