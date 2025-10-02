import React from 'react'
import './Note.css'

export default function Note({ title, description, user}) {
  return (
    <div className='note_main'>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
 