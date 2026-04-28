import React, { useState, useEffect } from 'react'

import { CiSquarePlus } from "react-icons/ci";
import { toast } from 'react-toastify';

import { addbookAPi, getUserBooksApi, removeUserBookApi, getBoughtBooksApi } from '../../services/allApis';
import { useContext } from 'react';
import { profileContext } from '../../contextApi/ContextApi';


import Header from '../components/Header'
import Footer from '../../components/Footer'
import Edit from '../components/Edit';
import base_url from '../../services/base_url';

function UserProfile() {

  const [sellStatus, setSellStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noOfPages: "", image: "", price: "", discountPrice: "", abstract: "", publisher: "",
    language: "", isbn: "", category: "", uploadImg: []
  })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [addedBooks, setAddedBooks] = useState([])
  const [boughtBooks, setBoughtBooks] = useState([])
  const [username,setUsername]=useState("")
  const [profileImage,setProfileImage]=useState("")
  const [bio,setBio]=useState("")
  const {profileStatus,setProfileStatus}=useContext(profileContext)

  useEffect(() => {

    if (bookStatus) {
      getUserBookList()
    }
    if (purchaseStatus) {
      getBoughtBooks()
    }
  }, [bookStatus, purchaseStatus])

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setUsername(sessionStorage.getItem('uname'))
      setProfileImage(sessionStorage.getItem('dp'))
      setBio(sessionStorage.getItem('bio'))
    }
  },[profileStatus])

  const handleBookImageUpload = (e) => {
    const imgFile = e.target.files[0]
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    const bookImgArray = bookDetails.uploadImg
    bookImgArray.push(imgFile)
    setBookDetails({ ...bookDetails, uploadImg: bookImgArray })
    const bookImgList = previewList
    bookImgList.push(url)
    setPreviewList(bookImgList)

  }
  // console.log(previewList)

  const handleAddBookSubmit = async () => {
    console.log(bookDetails)
    const { title, author, noOfPages, image, price, discountPrice, abstract, publisher,
      language, isbn, category, uploadImg } = bookDetails
    if (!title || !author || !noOfPages || !image || !price || !discountPrice || !abstract ||
      !publisher || !language || !isbn || !category || uploadImg.length <= 0) {
      toast.warning("Enter Valid Inputs!!")
    }
    else {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('author', author)
      formData.append('noOfPages', noOfPages)
      formData.append('image', image)
      formData.append('price', price)
      formData.append('discountPrice', discountPrice)
      formData.append('abstract', abstract)
      formData.append("publisher", publisher)
      formData.append('language', language)
      formData.append('isbn', isbn)
      formData.append('category', category)
      uploadImg.forEach((file) => {
        formData.append('uploadImg', file)
      })

      const response = await addbookAPi(formData)
      if (response.status === 200) {
        toast.success("Book Details Uploaded Successfully!!")
        setBookDetails({
          title: "", author: "", noOfPages: "", image: "", price: "", discountPrice: "", abstract: "", publisher: "",
          language: "", isbn: "", category: "", uploadImg: []
        })
        setPreview("")
        setPreviewList([])
      }
      else {
        toast.error("Book Details Uploading Failed!!!")
      }
    }

  }

  const getUserBookList = async () => {
    const response = await getUserBooksApi()
    console.log(response)
    if (response.status === 200) {
      setAddedBooks(response.data)
    }


  }

  const handleRemoveBook = async (id) => {
    const response = await removeUserBookApi(id)
    if (response.status === 200) {
      toast.success("Book Removed Successfully")
      getUserBookList()
    }
    else {
      toast.error("Book Removal Failed!")
    }
  }

  const getBoughtBooks = async () => {
    const response = await getBoughtBooksApi()
    if (response.status === 200) {
      setBoughtBooks(response.data)
    }
    else {
      console.log(response)
    }
  }





  return (
    <>
      <Header />
      <div className='min-h-[60vh]'>
        <div className='w-full bg-gray-900 h-[40vh] relative'>
          <img src={profileImage?(profileImage.startsWith("https://lh3.googleusercontent.com")?profileImage:`${base_url}/uploadImg/${profileImage}`):"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"}
            alt="profile_pic" className='rounded-full absolute left-5 -bottom-25' style={{width:'250px'}} />
        </div>
        <div className='mt-30 px-5 md:px-20'>
          <div className='flex justify-between '>
            <h1 className="text-2xl">{username}</h1>
            <Edit/>
          </div>
          <p className='text-justify my-3'>
           {bio}
          </p>
        </div>
        <div className='flex justify-center items-center my-10'>
          <div className={sellStatus ? 'p-3 border-gray-800 border-t border-l border-r rounded-t-sm text-blue-800' : 'p-3 border-b border-gray-800'}
            onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }} >
            Sell Book
          </div>
          <div className={bookStatus ? 'p-3 border-gray-800 border-t border-l border-r rounded-t-sm text-blue-800' : 'p-3 border-b border-gray-800'}
            onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }}>
            Book Status
          </div>
          <div className={purchaseStatus ? 'p-3 border-gray-800 border-t border-l border-r rounded-t-sm text-blue-800' : 'p-3 border-b border-gray-800'}
            onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }}>
            Purchase History
          </div>
        </div>
        {/* Upload Book Form */}
        {
          sellStatus &&
          <div className='px-5 md:px-50 mb-10'>
            <div className='bg-gray-300 p-3'>
              <h1 className="text-center my-5 text-xl">Book Details</h1>
              <div className="md:grid grid-cols-2 gap-3">
                <div>
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Title' value={bookDetails.title} onChange={(e) => { setBookDetails({ ...bookDetails, title: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Author' value={bookDetails.author} onChange={(e) => { setBookDetails({ ...bookDetails, author: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='No Of Pages' value={bookDetails.noOfPages} onChange={(e) => { setBookDetails({ ...bookDetails, noOfPages: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Image Url' value={bookDetails.image} onChange={(e) => { setBookDetails({ ...bookDetails, image: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Price' value={bookDetails.price} onChange={(e) => { setBookDetails({ ...bookDetails, price: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Discount Price' value={bookDetails.discountPrice} onChange={(e) => { setBookDetails({ ...bookDetails, discountPrice: e.target.value }) }} />
                  <textarea name="" id="" className='w-full bg-white placeholder-gray-400 rounded-sm p-3' rows={'8'} placeholder='Abstract' value={bookDetails.abstract} onChange={(e) => { setBookDetails({ ...bookDetails, abstract: e.target.value }) }} >
                  </textarea>
                </div>
                <div>
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Publisher' value={bookDetails.publisher} onChange={(e) => { setBookDetails({ ...bookDetails, publisher: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Language' value={bookDetails.language} onChange={(e) => { setBookDetails({ ...bookDetails, language: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='ISBN' value={bookDetails.isbn} onChange={(e) => { setBookDetails({ ...bookDetails, isbn: e.target.value }) }} />
                  <input type="text" className="p-3 bg-white placeholder-gray-400 rounded-sm mb-3 w-full" placeholder='Category' value={bookDetails.category} onChange={(e) => { setBookDetails({ ...bookDetails, category: e.target.value }) }} />
                  <label htmlFor="imginp" className='flex justify-center'>
                    <input type="file" onChange={(e) => { handleBookImageUpload(e) }} className='hidden' id='imginp' />
                    {
                      !preview ?
                        <img src="https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_1280.png" alt="fileinput"
                          className='w-[80%] cursor-pointer' />
                        :
                        <img src={preview} alt="fileinput"
                          className='w-[60%] cursor-pointer' />
                    }

                  </label>
                  {
                    preview &&
                    <div className='flex justify-around my-2'>
                      {
                        previewList?.map((item) => (
                          <img src={item} alt="img" width={'50px'} />
                        ))
                      }
                      {
                        previewList.length < 3 &&
                        <label htmlFor="imginp" className='flex justify-center'>
                          <input type="file" onChange={(e) => { handleBookImageUpload(e) }} className='hidden' id='imginp' />
                          <CiSquarePlus size={'50px'} />
                        </label>
                      }

                    </div>
                  }

                </div>
              </div>
              <div className='p-2 flex justify-end gap-3'>
                <button className='p-3 border bg-red-700 border-red-700 text-white rounded-sm hover:bg-white hover:text-red-700'>Reset</button>
                <button className='p-3 border bg-green-700 border-green-700 text-white rounded-sm hover:bg-white hover:text-green-700' onClick={handleAddBookSubmit}>Submit</button>
              </div>
            </div>
          </div>
        }
        {
          bookStatus &&
          <>
            {
              addedBooks.length > 0 ?
                <>
                  {/* Book Card */}
                  <div className='px-5 md:px-30 mb-10 shadow-lg border border-gray-100 p-4 flex flex-col justify-center items-center'>
                    {
                      addedBooks.map(item => (
                        <div className='w-full border shadow bg-white p-10 mb-5'>
                          <div className='flex justify-between'>
                            <div>
                              <h1 className='text-xl font-bold'>{item.title}</h1>
                              <h2 className='font-bold'>{item.price}</h2>
                              <p className='text-justify'>
                                {item.abstract}
                              </p>
                              <div>
                                {
                                  (item.status == 'pending') ?
                                    <img src="https://png.pngtree.com/png-vector/20220322/ourmid/pngtree-pending-stamp-illustration-symbol-stamp-vector-png-image_3791329.png" alt="pending" style={{ height: '200px' }} />
                                    :
                                    <img src="https://png.pngtree.com/png-vector/20221009/ourmid/pngtree-original-approved-stamp-and-badget-design-red-grunge-png-image_6293837.png" alt="approve" style={{ height: '200px' }} />

                                }
                              </div>
                            </div>
                            <div>
                              <img src={item.image} alt="book" style={{ height: '250px', width: '400px' }} />
                              <button className='bg-red-700 text-white px-3 py-1 mt-2 rounded-lg' onClick={() => { handleRemoveBook(item._id) }}>Remove</button>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </>
                :
                <>
                  {/* No Books */}

                  < div className='px-5 md:px-50 mb-10 shadow-lg border border-gray-100 p-4 flex flex-col justify-center items-center'>
                    <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" className='' width={'300px'} alt="no_books" />
                    <h1 className="text-2xl text-red-500">No Books Added Yet</h1>
                  </div>
                </>
            }



          </>
        }
        {
          purchaseStatus &&
          <>
            {
              boughtBooks.length > 0 ?
                <>
                  <div className='px-5 md:px-30 mb-10 shadow-lg border border-gray-100 p-4 flex flex-col justify-center items-center'>
                    {
                      boughtBooks.map(item => (
                        <div className='w-full border shadow bg-white p-10 mb-5'>
                          <div className='flex justify-between'>
                            <div>
                              <h1 className='text-xl font-bold'>{item.title}</h1>
                              <h2 className='font-bold'>{item.price}</h2>
                              <p className='text-justify'>
                                {item.abstract}
                              </p>
                              <div>
                                <img src="https://png.pngtree.com/png-vector/20220724/ourmid/pngtree-checkout-completed-icon-icon-order-commerce-vector-png-image_38118712.png" alt="purchased"
                                style={{width:'300px'}} />
                              </div>
                            </div>
                            <div>
                              <img src={item.image} alt="book" style={{ height: '250px', width: '400px' }} />
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </>
                :
                <div className='px-5 md:px-50 mb-10 shadow-lg border border-gray-100 p-4 flex flex-col justify-center items-center'>
                  <img src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif" className='' width={'300px'} alt="no_books" />
                  <h1 className="text-2xl text-red-500">No Books Purchased Yet</h1>
                </div>
            }
          </>
        }

        {/* Modal For Profile Edit */}
        
      </div >
      <Footer />
    </>
  )
}

export default UserProfile