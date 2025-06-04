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
import StudentDashboard from "./Pages/Learner/Learner-Dashboard/StudentDashboard";
import ChangePassword from "./Pages/Learner/password/ChangePassword";
// import OAuthSuccess from "./Pages/OAuthSuccess";
import TutorSignUp from "./Pages/Educator/TutorSignUp";
import LinkedInCallback from "./Pages/SocialMediaLogIn/LinkedInCallback";
import LinkedInLogin from "./Pages/SocialMediaLogIn/Linkedin";
import TutorSignIn from "./Pages/Educator/TutorSignIn";
import Learnerprofile from "./Pages/Learner/learner-profile/Learnerprofile";
import SystemInfo from "./Pages/Learner/learner-profile/SystemInfo";
import StudentBackground from "./Pages/Learner/learner-profile/StudentBackground";
import Logout from "./Pages/Logout"; // Make sure to import the Logout component
import TutorProfileCard from "./Pages/Educator/Tutor-profile/TutorProfileCard";
import TutorDashboard from "./Pages/Educator/TutorDashboard";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = React.useContext(AuthContext);
  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  return user ? children : <Navigate to="/signin" />;
};

// Layout to conditionally render Navbar/Footer
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <div className="h-screen">
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/role-selection" element={<ScrumLanding />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/success_email_verification"
              element={<SuccessfulEmailVerification />}
            />
            <Route path="/check-your-email" element={<CheckYourEmail />} />
            <Route path="/expired_link_page" element={<ExpiredLink />} />
            <Route path="/verify" element={<SuccessfulReg />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/course-list" element={<CourseList />} />
            <Route path="/course-list/input" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/myenrollment" element={<MyEnrollment />} />
            <Route path="/loading/:path" element={<Loading />} />
            <Route path="/" element={<LinkedInLogin />} />
            <Route path="/linkedin/callback" element={<LinkedInCallback />} />
            <Route path="/learner-profile" element={<Learnerprofile />} />
            <Route path="/system-info" element={<SystemInfo />} />
            <Route path="/student-bg-info" element={<StudentBackground />} />
            {/* Protected Routes */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/logout" element={<Logout />} />{" "}
            {/* Add this route for logout */}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/educator" element={<Educator />}>
            <Route index element={<Dashboard />} />
            <Route path="tutorSignUp" element={<TutorSignUp />} />
            <Route path="tutor-signin" element={<TutorSignIn />} />
            <Route path="tutor-dashboard" element={<TutorDashboard />} />
            <Route path="tutor-profile" element={<TutorProfileCard />} />
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
