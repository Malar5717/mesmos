import axios from 'axios'
import React, { useState } from 'react'

function Upload() {

  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ image, setImage ] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault() // form refreshes upon submit
    if(!title || !description) {
      return
    }
    // feature of browser
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)

    axios.post("http://localhost:3000/pola/create", formData, {withCredentials: true})
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.log(err)})
  }

  return (
    <form className='create_main' onSubmit={handleSubmit}>

      <div className='form-item'>
        <label htmlFor='image'>Image:</label>
          <input type='file' id='image' value={ image } onChange={ setImage }></input>
      </div>

      <div className='form-item'>
        <label htmlFor='title'>Title:</label>
          <input type='text' id='title' value={ title } onChange={ setTitle }></input>
      </div>

      <div className='form-item'>
        <label htmlFor='desc'>Description:</label>
          <input type='text' id='desc' value={ description } onChange={ setDescription }></input>
      </div>

      <button>submit</button>

    </form>
  )
}

export default Upload

 