import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/signIn'
import Signup from './pages/signup'
import ForgotPassword from './pages/ForgotPassword';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useGetCity from './hooks/useGetCity';
import useGetMyshop from './hooks/useGetMyShop';
import CreateEditShop from './pages/CreateEditShop';


export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser()
  useGetCity()
  useGetMyshop()
   const {userData} = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
      <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
      <Route path='/create-edit-shop' element={userData?<CreateEditShop/>:<Navigate to={"/signin"}/>}/>
    </Routes>


  )
}

export default App