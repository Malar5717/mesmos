import React from 'react'
import './Note.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function Note({ title, description, createdAt, style }) {
  console.log('Note style:', style);
  const date = new Date(createdAt);
  const istDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour12: ![],
  }).format(date);
  
  return (
    <div className={`pola ${style}`}>
      {style === "sweet-heart" && (
        <div className='heart'>
          <FontAwesomeIcon icon={faHeart} style={{color: "black"}} />
          <FontAwesomeIcon icon={faHeart} style={{color: "#aa3108"}} />
          <FontAwesomeIcon icon={faHeart} style={{color: "#aa3108"}} />
        </div>
      )}
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="dt">{istDate}</p>
    </div>
  )
}
