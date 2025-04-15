import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import SignUp from "./Pages/Learner/SignUp";
import SuccessfulReg from "./Pages/Learner/SuccesfulRegPage/SuccessfullRegPage";
import Landing from "./Pages/Landing/Landing";
import CourseList from "./Pages/Learner/CourseList";
import CourseDetails from "./Pages/Learner/CourseDetails";
import MyEnrollment from "./Pages/Learner/MyEnrollment";
import Loading from "./Components/student/Loading";
import Educator from "./Pages/Educator/Educator";
import Dashboard from "./Pages/Educator/Dashboard";
import StudentsEnrolled from "./Pages/Educator/StudentsEnrolled";
import AddCourse from "./Pages/Educator/AddCourse";
import MyCourses from "./Pages/Educator/MyCourses";
import Navbar from "./Components/student/Navbar";
import ScrumLanding from "./Pages/Landing/ScrumLanding";
import EmailVerification from "./Pages/Email_verification/EmailVerification";
import SuccessfulEmailVerification from "./Pages/Email_verification/SuccessfulEmailVerification";
import ExpiredLink from "./Pages/Email_verification/ExpiredLink";
import SignIn from "./Pages/Learner/SignIn";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import ImageSlideShow from "./Pages/Learner/ImageSlideShow";
import Footer from "./Pages/Learner/Footer";

const App = () => {

  const isEducatorRoute = useMatch("/educator/*");
  return (
    <div className="text-default h-screen">
      {!isEducatorRoute && <Navbar />}

      
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<ScrumLanding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route
          path="/success_email_verification"
          element={<SuccessfulEmailVerification />}
        />
        <Route path="/expired_link_page" element={<ExpiredLink />} />
        <Route path="/successfulReg" element={<SuccessfulReg />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/myenrollment" element={<MyEnrollment />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator />}>
          <Route path="educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
      {<Footer/>}
     
    </div>
  );
};

export default App;
