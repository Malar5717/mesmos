import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomeContent from './pages/Home/Home'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import MyMemories from './pages/my_memories/MyMemories'
import PreLoader from './pages/preloader/PreLoader'

function App() { 

  return (
    <div className='app_main'>
      <Routes>
    
        <Route path="/" element={<PreLoader />} />
        <Route path="/home" element={<HomeContent />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<MyMemories />} />

      </Routes>
    </div>
  )

}

export default App                                                                                                     