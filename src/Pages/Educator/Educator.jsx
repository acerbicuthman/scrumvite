import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../../Components/student/Navbar'
import Footer from '../Learner/Footer'

const Educator = () => {
  return (
    <div>
        {<Navbar/>}
        {<Outlet/>}
        {<Footer/>}
    </div>
  )
}

export default Educator
