import { useState, useEffect } from "react"
import axios from "axios"

import Note from '../../components/notes/Note'
import NavBar from '../../components/navigation/NavBar'
import Create from '../../components/create/Create'

const MyMemories = () => {

    const [ polas, setPolas ] = useState([])
    const [ isCreateOpen, setIsCreateOpen ] = useState(false)  // for conditional rendering

    useEffect(() => {
      const fetchPolas = () => {
        axios.get("http://localhost:3000/pola/my", {withCredentials: true})
          .then(res => setPolas(res.data))
          .catch(err => console.log(err))                                          
      }
      fetchPolas()
    }, [])

    return (
        <>
        <NavBar onAddClick={setIsCreateOpen} isCreateOpen={isCreateOpen}/>
        <div className="polas">
          {polas.map((pola, i) => (
            <Note title={pola.title}  description={pola.description} key={i}/>
          ))}
        </div>
      
        {isCreateOpen && <Create /> }
        </>
    )
      
}

export default MyMemories