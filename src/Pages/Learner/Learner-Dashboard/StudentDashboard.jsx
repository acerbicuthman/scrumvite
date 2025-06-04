import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaChartBar,
  FaUsers,
  FaCog,
  FaLaptop,
} from "react-icons/fa";

import { useAuth } from "../../../context/Authcontext";
import AsidesNav from "./AsidesNav";
import MainContent from "./MainContent";

const StudentDashboard = () => {
  const { user, accessToken, isLoading } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapse] = useState(false)
  // Show loading or unauthorized message
  if (isLoading) {
    return <div className="text-white p-10">Loading your dashboard...</div>;
  }

  if (!accessToken || !user) {
    return (
      <div className="text-white p-10">
        You are not authorized. Please log in.
      </div>
    );
  }

  return (

    <div className="mt-20 flex bg-[#121221] ">
      {/* Sidebar */}
      <div className=" h-screen shadow-[4px_0_12px_rgba(0,0,0,0.3)]">
      <AsidesNav collapsed={collapsed} setCollapse={setCollapse}/>
      </div>
      {/* Main Content */}
    <div className={`transition-all duration-300 ${collapsed ? `w-[calc(100%-100pxx)]`: `w-[calc(100%-98px)]`}`}>
    <MainContent/>
    </div>
    

     
     
    </div>
  );
};

export default StudentDashboard;
