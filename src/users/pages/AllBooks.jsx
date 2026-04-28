import React, { useState, useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { allBooksApi } from '../../services/allApis';
import { searchContext } from '../../contextApi/ContextApi';

import Header from '../components/Header'
import Footer from '../../components/Footer'

function AllBooks() {

  const [collapse, setCollapse] = useState(false)
  const [token, setToken] = useState("")
  const [bookList, setBookList] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [tempBooks,setTempBooks]=useState([])
  const [searchKey,setSearchKey]=useState([])

  //consuming searchContext
  const {globalSearchKey,setGlobalSearchKey}=useContext(searchContext)

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getAllBooks()
      setToken(sessionStorage.getItem('token'))
    }
    else {
      setToken("")
    }

  }, [globalSearchKey])

  console.log(searchKey)

  const getAllBooks = async () => {
    const response = await allBooksApi(globalSearchKey)
    if (response.status === 200) {
      const allbooks = response?.data
      setBookList(allbooks)
      setTempBooks(allbooks)
      const tempArray = []
      allbooks.forEach(item => {
        !tempArray.includes(item.category) && tempArray.push(item.category)
      })
      setAllCategories([...tempArray])

    }
  }

  const filterBooks=(category)=>{
    console.log(category)
    if(category=="No-Filter"){
      getAllBooks()
    }
    else{
      const filter=tempBooks.filter(item=>item.category.toLowerCase().includes(category.toLowerCase()))
      setBookList(filter)
    }
  }

  return (
    <>
      <Header />
      {
        token ?
          <div className='min-h-[60vh] py-10 px-5 '>
            <h1 className="text-3xl text-center">Collections</h1>
            <div className='flex justify-center items-center mb-4'>
              <input type="text" placeholder='Search By Title' className='placeholder-gray-600 border py-2 my-2 w-[50%]' onChange={(e)=>{setGlobalSearchKey(e.target.value)}}/>
              {/* <button className=' py-2 px-2 bg-blue-800 text-white border border-blue-800 hover:bg-white hover:text-blue-800'>Search</button> */}
            </div>
            <div className={!collapse && 'md:grid grid-cols-5 gap-2'}>
              <div className='col-span-1'>
                <div className='flex justify-between items-center'>
                  {
                    !collapse &&
                    <h1 className="text-2xl mb-5">Filters</h1>
                  }

                  <button className='text-2xl' onClick={() => setCollapse(!collapse)}>
                    <GiHamburgerMenu />
                  </button>
                </div>
                {!collapse &&
                  <>
                    {
                      allCategories.length > 0 &&
                      <>
                        {
                          allCategories.map(item => (
                            <div className='my-4' key={item}>
                              <input type="radio" onClick={()=>{filterBooks(item)}} id={item} value={item} name='filter' />{' '}
                              <label htmlFor={item}>{item}</label>
                            </div>
                          ))
                        }
                      </>
                    }
                    <div className='my-4' key={'No-Filter'}>
                      <input id='No-Filter' name='filter' type="radio" value={'No-Filter'} onClick={()=>{filterBooks('No-Filter')}}/>{' '}
                      <label htmlFor="No-Filter">No-Filter</label>
                    </div>
                  </>
                }

              </div>
              <div className="col-span-4 mt-5">
                <div className=' flex flex-col items-center md:flex-row md:justify-center gap-2 md:flex-wrap '>
                  {/* Card */}
                  {
                    bookList.filter(item=>item.status=="approved").length > 0 ?
                      <>
                        {
                          bookList.filter(item=>item.status=="approved").map(item => (
                            <div className="p-1 w-[70%] md:w-[16rem] shadow-xl text-center">
                              <Link to={`/books/${item?._id}/view`}>
                                <img src={item?.image} alt="bookimg"
                                  style={{ height: "300px", width: '100%' }} />
                              </Link>
                              <h2 className="text-lg">{item?.title}</h2>
                              <h4 className="text-lg text-blue-600">${item?.price}</h4>
                            </div>
                          ))
                        }
                      </>
                      :
                      <h2 className="text-center">No Books Available!!</h2>
                  }


                </div>
              </div>
            </div>
          </div>
          :
          <div className='min-h-[60vh] py-10 px-5 flex flex-col justify-center items-center'>
            <img src="https://img.freepik.com/free-vector/padlock-no-sign_78370-4919.jpg?semt=ais_hybrid&w=740&q=80" alt="not-login"
              className='w-[30%]' />
            <p className='text-xl font-bold'>Please <Link to={'/login'} className='text-blue-700 underline'>Login</Link> First to Explore...</p>
          </div>
      }

      <Footer />
    </>
  )
}

export default AllBooks