import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './NavBar.css'
import { Link } from 'react-router'

function NavBar({ onAddClick, isCreateOpen }) {

  const [ isVerified, setIsVerified ] = useState(false)

  useEffect(() => {
    const isAuth = () => {
      axios.get("http://localhost:3000/user/protected", {withCredentials: true})
        .then(res => setIsVerified(res.data.isVerified))
        .catch(err => console.log(err))
    }
    isAuth()
  }, [])

  return (
    <div className='navbar_main'>
      <div className='logo'>
        <p>mesmos</p>
      </div>
      <div className='account'>
        {isVerified && 
          <>
            <p onClick={() => onAddClick(!isCreateOpen)}>create</p> 
            <p>my memories</p>
          </>
        }
    
        {!isVerified &&
          <>
            <Link to='/signup'>signup</Link>
            <Link to='/login'>login</Link>
          </>
        }
      </div>
    </div>
  )
}

export default NavBar
