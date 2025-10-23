import React from 'react'
import './NavBar.css'

function NavBar({ onAddClick, isCreateOpen }) {
  return (
    <div className='navbar_main'>
      <div className='logo'>
        <p>LOGO</p>
      </div>
      <div className='account'>
        <p onClick={() => onAddClick(!isCreateOpen)}>add</p>
        <p>acc</p>
      </div>
    </div>
  )
}

export default NavBar
