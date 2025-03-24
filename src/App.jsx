import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/Learner/Home'
import SuccessfulReg from './Pages/Learner/SuccesfulRegPage/SuccessfullRegPage'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/successfulReg' element={<SuccessfulReg/>}/>

    
     
      </Routes>
    </div>
  )
}

export default App