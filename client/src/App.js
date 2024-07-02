import { createContext, useReducer, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Update from './components/Update'



function App() {

  return (
    <>

      <div className='overflow-x-clip '>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update/:id" element={<Update />} />

      </Routes>
      
       </div>
      
    </>
  )
}

export default App
