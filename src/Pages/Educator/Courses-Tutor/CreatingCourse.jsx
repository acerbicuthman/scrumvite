// Refactored CreatingCourse Component
import React, { useMemo } from 'react';
import AsideTutor from '../Dashboard/AsideTutor';
import ModuleMaterials from './ModuleMaterials';
import useCourseModuleManager from '../../../hooks/useCourseModuleManager';

const CreatingCourse = () => {
  const {
    collapsed,
    setCollapse,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    modules,
    selectedModuleId,
    setSelectedModuleId,
    title,
    setTitle,
    description,
    setDescription,
    message,
    errorMessage,
    createModule,
    token,
  } = useCourseModuleManager();

  const courseOptions = useMemo(() => (
    courses.map(course => (
      <option key={course.id} value={course.id}>{course.title}</option>
    ))
  ), [courses]);

  return (
    <div className="mt-20 text-white flex bg-[#121221]">
      <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
      <div className={`p-6 transition-all duration-300 ${collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-100px)]'}`}>
        <p className="text-[#9696C4] text-2xl md:text-base lg:text-xl">
          My Courses / Introduction to Scrum / <span className="text-white">Module 1: Scrum Basics</span>
        </p>

        <div className="mt-10">
          <p className="text-3xl font-semibold">Module 1: Scrum Basics</p>
          <p className="text-[#9696C4] my-2">
            This module covers the fundamental principles of Scrum, including roles, events, and artifacts.
          </p>

          <form className="space-y-5 mt-5" onSubmit={createModule}>
            <div>
              <label>Select Course</label>
              <select
                className="bg-[#1C1C30] border border-[#363863] w-full p-2 mt-1"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="" disabled>Select a course</option>
                {courseOptions}
              </select>
            </div>

            <div>
              <label htmlFor="moduleTitle">Module Title</label>
              <input
                type="text"
                id="moduleTitle"
                className="bg-[#1C1C30] border border-[#363863] w-full p-2 mt-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="moduleDescription">Module Description</label>
              <textarea
                id="moduleDescription"
                cols="30"
                rows="5"
                className="bg-[#1C1C30] border border-[#363863] md:w-1/2 w-full p-2 mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="flex flex-row-reverse gap-4 mt-5">
              <button type="submit" className="bg-[#4045E0] rounded-md p-3">
                Save Changes
              </button>
              <button type="button" className="bg-[#262645] rounded-md p-3">
                Cancel
              </button>
            </div>
          </form>

          {message && <p className="text-green-400 mt-2">{message}</p>}
          {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}

        </div>

        <ModuleMaterials
          selectedCourseId={selectedCourseId}
          selectedModuleId={selectedModuleId}
          setSelectedModuleId={setSelectedModuleId}
          modules={modules}
          token={token}
        />
      </div>
    </div>
  );
};

export default CreatingCourse;
