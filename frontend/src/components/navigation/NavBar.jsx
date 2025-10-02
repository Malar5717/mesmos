import React from 'react'
import './NavBar.css'

function NavBar({ onAddClick, isCreateOpen }) {
  return (
    <div className='navbar_main'>
      <div className='logo'>
        <p>abcdef.</p>
      </div>
      <div className='account'>
        <p onClick={() => onAddClick(!isCreateOpen)}>add</p>
        <p>recall</p>
        <p>acc</p>
      </div>
    </div>
  )
}

export default NavBar
