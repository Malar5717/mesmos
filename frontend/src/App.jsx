import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomeContent from './pages/Home'
import SignUp from './components/get-in/Signup'

function App() { 

  return (
    <div className='app_main'>
      <Routes>
    
        <Route path="/" element={<HomeContent />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </div>
  )

}

export default App
                                                                                                      