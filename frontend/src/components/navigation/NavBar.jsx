import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './NavBar.css'

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
        <p>LOGO</p>
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
            <p>signup</p>
            <p>login</p>
          </>
        }
      </div>
    </div>
  )
}

export default NavBar
