import React from "react";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser";
import studentHead from "../../../assets/studentHead.png";
import fileicon from "../../../assets/File.png";
import playBtn from "../../../assets/playbutton.png";
import { Link } from "react-router";

const MainContentTutor = () => {
  const { user } = useAuthenticatedUser();
  const first_name = user?.profile?.tutor?.first_name;
  const last_name = user?.profile?.tutor?.last_name;
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-semibold mb-4">
        Welcome back, {first_name} {last_name}!
      </h1>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#121221] p-5 rounded shadow border border-[#363863]">
            <h3 className="text-xl font-medium">Active Courses</h3>
            <p className="mt-4 text-3xl font-semibold">3 </p>
          </div>
          <div className="bg-[#121221] p-5 rounded shadow border border-[#363863]">
            <h3 className="text-xl font-medium">Enrolled Students</h3>
            <p className="mt-4 text-3xl font-semibold">200</p>
          </div>
          <div className="bg-[#121221] p-5 rounded shadow border border-[#363863]">
            <h3 className="text-xl font-medium">Recent Submission</h3>
            <p className="mt-4 text-3xl font-semibold">18</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-semibold">Quick Actions</h1>
        <div className="flex gap-5 mt-5">
          <div >

            <button className="p-4 bg-[#4045E0] rounded-xl font-semibold">
             <Link to="/educator/create-course">
             Create Course
             </Link> 
            </button>
          </div>
          <div>
            <button className="p-4 bg-[#262645] rounded-xl font-semibold">
              View Analytics
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-3xl font-semibold">Recent Activity</h1>
          <div className="space-y-5 mt-5">
            <div className="flex gap-5">
              <div>
                <img src={studentHead} alt="" />
                <div className=""><hr  className=" h-10 border-r-2 border-t-0 border-[#9696C4] absolute ml-2 "/></div>
              </div>
              <div>
                <p className="text-xl">New student enrolled in 'Advanced Python'</p>
                <p className="text-[#9696C4]">2 hours</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div>
                <img src={fileicon} alt="" />
                <div className=""><hr  className=" h-10 border-r-2 border-t-0 border-[#9696C4]  absolute ml-2 "/></div>

              </div>
              <div>
                <p className="text-xl">Assignment submitted for 'Data Science'</p>
                <p className="text-[#9696C4]">Yesterday</p>
              </div>
            </div>{" "}
            <div className="flex gap-5">
              <div>
                <img src={playBtn} alt="" />
              </div>
              <div>
                <p className="text-xl">Course 'Machine Learning Basics' created</p>
                <p className="text-[#9696C4]">3 Days Ago</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MainContentTutor;
