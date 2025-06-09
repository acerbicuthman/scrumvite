import { useState, React } from "react";
import AsidesNav from "../Learner-Dashboard/AsidesNav";
import CoursesBody from "./CoursesBody";


const CourseList = () => {
  const [collapsed, setCollapse] = useState(false);
  return (
    <div className="mt-20 flex text-white bg-[#121221]">
      <AsidesNav collapsed={collapsed} setCollapse={setCollapse} />
      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? `md:w-[calc(100%-98px)]` : `md:w-[calc(100%-100px)]`
        }`}
      >
        <CoursesBody/>
        {/* <div className="py-2 pl-4 pr-14 ">
          <div className="">
            <h1 className="font-semibold text-3xl my-3">My Courses</h1>
          </div>
          <div className="flex md:flex-row flex-col">
            <div className="flex-1">
              <p className="font-semibold text-xl my-5">Active Courses</p>
              <p className="text-[#9696C4]">in Progress</p>
              <p>Advanced Calculus</p>
              <p className="text-[#9696C4]">Tutor: Dr. Eleanor Vance</p>
              <button className=" my-4 py-2 px-5 bg-[#262645]">
                View Course
              </button>
            </div>
            <div className="px-4">
              <img src={textBookImg} alt="" />
            </div>
          </div>
          <div className="flex md:flex-row flex-col mt-5">
            <div className="flex-1 mb-2">
              <p>Course Progress</p>
            </div>
            <div>50%</div>
          </div>
          <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
          </div>
          <div className="mt-10"></div>
          <div className="flex md:flex-row flex-col mt-10">
            <div className="flex-1">
              <p className="font-semibold text-xl my-5">Completed Courses</p>
              <p className="text-[#9696C4]">Completed</p>
              <p>Introduction to Programming</p>
              <p className="text-[#9696C4]">Tutor: Mr. Ethan Carter</p>
              <button className=" my-4 py-2 px-5 bg-[#262645]">
                View Course
              </button>
            </div>
            <div className="px-4">
              <img src={mimiProgramImg} alt="" />
            </div>
          </div>
          <div className="flex md:flex-row flex-col mt-5">
            <div className="flex-1 mb-2">
              <p>Course Progress</p>
            </div>
            <div>100%</div>
          </div>
          <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
          </div>

          <div className="flex md:flex-row flex-col mt-10">
            <div className="flex-1">
              <p className="font-semibold text-xl my-5">Completed Courses</p>
              <p className="text-[#9696C4]">Completed</p>
              <p>Linear Algebra</p>
              <p className="text-[#9696C4]">Tutor: Dr. Olivia Bennett</p>
              <button className=" my-4 py-2 px-5 bg-[#262645]">
                View Course
              </button>
            </div>
            <div className="px-4">
              <img src={linearAlgebraImg} alt="" />
            </div>
          </div>
          <div className="flex md:flex-row flex-col mt-5">
            <div className="flex-1 mb-2">
              <p>Course Progress</p>
            </div>
            <div>100%</div>
          </div>
          <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CourseList;
