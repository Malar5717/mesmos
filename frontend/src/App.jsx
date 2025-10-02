import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Note from './components/notes/Note'


function App() {

  const HomeContent = () => {

    const [ polas, setPolas ] = useState([])

    useEffect(() => {
      const fetchPolas = () => {
        axios.get("http://localhost:3000/pola/all")
          .then(res => setPolas(res.data))
          .catch(err => console.log(err))
      }
      fetchPolas()
    }, [])

      return (
        <div className="polas">
          {polas.map((pola, i) => (
            <Note title={pola.title}  description={pola.description} key={i}/>
          ))}
        </div>
      )
      
    }

  return (
    <div className='app_main'>
      <Routes>
    
        <Route path="/" element={<HomeContent />} /> 
        
      </Routes>
    </div>
  )

}

export default App
