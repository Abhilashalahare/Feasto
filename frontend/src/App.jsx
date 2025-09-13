import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './pages/signIn'
import Signup from './pages/signup'
import ForgotPassword from './pages/ForgotPassword';
import UseGetCurrentUser from './hooks/UseGetCurrentUser';

export const serverUrl = "http://localhost:8000";

const App = () => {
  UseGetCurrentUser()
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
    </Routes>

  )
}

export default App
