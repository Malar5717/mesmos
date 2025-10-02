import axios from 'axios'
import React, { useState } from 'react'

function Create() {

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

    axios.post("http://localhost:3000/pola/create", { title, description }, {withCredentials: true})
      .then((res)=>{console.log(res)})
      .catch((err)=>{console.log(err)})
  }

  return (
    <form className='create_main' onSubmit={handleSubmit}>

      <div className='form-item'>
        <label htmlFor='image'>Image:</label>
          <input type='file' id='image' value={ image } onChange={ (e) => setImage(e.target.files[0]) }></input>
      </div>

      <div className='form-item'>
        <label htmlFor='title'>Title:</label>
          <input type='text' id='title' value={ title } onChange={ (e) => setTitle(e.target.value) }></input>
      </div>

      <div className='form-item'>
        <label htmlFor='description'>Description:</label>
          <input type='text' id='description' value={ description } onChange={ (e) => setDescription(e.target.value) }></input>
      </div>

      <button>submit</button>

    </form>
  )
}

export default Create

 