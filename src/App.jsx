import { useState,useEffect } from 'react'
import './App.css'
import Home from './users/pages/Home'
import Career from './users/pages/Career'
import AllBooks from './users/pages/AllBooks'
import Contact from './users/pages/Contact'
import ViewBook from './users/pages/ViewBook'
import UserProfile from './users/pages/UserProfile'
import Auth from './pages/Auth'

import Dashboard from './admin/pages/Dashboard'
import BookList from './admin/pages/BookList'
import CareerList from './admin/pages/CareerList'
import Settings from './admin/pages/Settings'

import Preloader from './components/Preloader'
import Pnf from './pages/Pnf'


import { Routes,Route } from 'react-router-dom'


function App() {
  
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },3000)
  },[])



  return (
    <>
     <Routes>
      {/* User */}
      <Route path='/' element={loading?<Preloader/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/books' element={<AllBooks/>}/>
      <Route path='/books/:id/view' element={<ViewBook/>}/>
      <Route path='/career' element={<Career/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/user-profile' element={<UserProfile/>}/>
      {/* Admin */}
      <Route path='/admin-dashboard' element={loading?<Preloader/>:<Dashboard/>}/>
      <Route path='/admin-career' element={<CareerList/>}/>
      <Route path='/admin-books' element={<BookList/>}/>
      <Route path='/admin-settings' element={<Settings/>}/>
      {/*  */}
      <Route path='/*' element={<Pnf/>}/>
     </Routes>
    </>
  )
}

export default App
