import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import SignUp from './Pages/Learner/SignUp'
import SuccessfulReg from './Pages/Learner/SuccesfulRegPage/SuccessfullRegPage'
import Landing from './Pages/Landing/Landing'
import CourseList from './Pages/Learner/CourseList'
import CourseDetails from './Pages/Learner/CourseDetails'
import MyEnrollment from './Pages/Learner/MyEnrollment'
import Loading from './Components/student/Loading'
import Educator from './Pages/Educator/Educator'
import Dashboard from './Pages/Educator/Dashboard'
import StudentsEnrolled from './Pages/Educator/StudentsEnrolled'
import AddCourse from './Pages/Educator/AddCourse'
import MyCourses from './Pages/Educator/MyCourses'
import Navbar from './Components/student/Navbar'
import ScrumLanding from './Pages/Landing/ScrumLanding'
import EmailVerification from './Pages/Learner/Email_verification/EmailVerification'
import SuccessfulEmailVerification from './Pages/Learner/Email_verification/SuccessfulEmailVerification'
import ExpiredLink from './Pages/Learner/Email_verification/ExpiredLink'
import EmailSet from './Pages/Learner/Email_verification/EmailSet'


const App = () => {
  const isEducatorRoute = useMatch('/educator/*')
  return (
    <div className='text-default min-h-screen'>
      {!isEducatorRoute && <Navbar />}
      <Routes>
          {/* Landing Pages */}
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/' element={<ScrumLanding/>}/>


        {/* Learner Routes */}
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/emailverification' element={<EmailVerification/>}/>
        <Route path='/success_email_verification' element={<SuccessfulEmailVerification/>}/>
        <Route path='/expired_link_page' element={<ExpiredLink/>}/>
        <Route path='/successfulReg' element={<SuccessfulReg/>}/>
        <Route path='/email_set' element={<EmailSet/>}/>
        <Route path='/course-list' element={<CourseList/>}/>
        <Route path='/course-list/input' element={<CourseList/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/myenrollment' element={<MyEnrollment/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>

         {/* Educator Routes */}
        <Route path='/educator' element={<Educator/>}>
        <Route path='educator' element={<Dashboard/>}/>
        <Route path='add-course' element={<AddCourse/>}/>
        <Route path='my-courses' element={<MyCourses/>}/>
        <Route path='students-enrolled' element={<StudentsEnrolled/>}/>
      
    </Route>
    
     
      </Routes>
    </div>
  )
}

export default App