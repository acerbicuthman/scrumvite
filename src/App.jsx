import React from "react";
import { Route, Routes, useMatch, Navigate, Outlet } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/Authcontext";

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
import Footer from "./Pages/Learner/Footer";
import ForgetPassword from "./Pages/Learner/password/ForgetPassword";
import NotFound from "./Pages/NotFound";
import ResetPassword from "./Pages/Learner/password/ResetPassword";
import CheckYourEmail from "./Pages/Learner/CheckYourEmail";
import StudentDashboard from "./Pages/Learner/StudentDashboard";
import ChangePassword from "./Pages/Learner/password/ChangePassword";


// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = React.useContext(AuthContext);
  if (isLoading) {
    return <div>Loading...</div> ;
  }
  return user ? children : <Navigate to="/signin" />;
};

// Layout to conditionally render Navbar/Footer
const Layout = () => {
  const isEducatorRoute = useMatch("/educator/*");
  return (
    <>
      {!isEducatorRoute && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div className="text-default min-h-screen">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ScrumLanding />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/success_email_verification" element={<SuccessfulEmailVerification />} />
            <Route path="/check-your-email" element={<CheckYourEmail />} />
            <Route path="/expired_link_page" element={<ExpiredLink />} />
            <Route path="/verify" element={<SuccessfulReg />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/course-list" element={<CourseList />} />
            <Route path="/course-list/input" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/myenrollment" element={<MyEnrollment />} />
            <Route path="/loading/:path" element={<Loading />} />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                 </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/educator" element={<Educator />}>
            <Route index element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="students-enrolled" element={<StudentsEnrolled />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;