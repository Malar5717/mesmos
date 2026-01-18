import React from 'react';
import './Confirm.css';

function Confirm() {
  return (
    <div className='confirmation'>
      <p>Are you sure?</p>
      <div className='options'>
        <button>yes</button>
        <button>no</button>
      </div>
    </div>
  )
}

export default Confirm
