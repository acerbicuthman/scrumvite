// CreatingCourse.jsx
import React, { useMemo, useState } from 'react';
import AsideTutor from '../Dashboard/AsideTutor';
import useCourseModuleManager from '../../../hooks/useCourseModuleManager';

const CreatingCourse = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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
    submitModuleWithMaterials,
    token,
    loadingCourses,
  } = useCourseModuleManager();

  const courseOptions = useMemo(() => (
    courses.map(course => (
      <option key={course.id} value={course.id}>{course.title}</option>
    ))
  ), [courses]);

  const [materialInputs, setMaterialInputs] = useState([
    { title: '', material_type: '', url: '' }
  ]);

  const handleAddMaterialField = () => {
    setMaterialInputs([...materialInputs, { title: '', material_type: '', url: '' }]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materialInputs];
    updated[index][field] = value;
    setMaterialInputs(updated);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    if (!selectedCourseId) {
      alert("Please select a course before submitting.");
      setLoadingSubmit(false);
      return;
    }

    try {
      const validMaterials = materialInputs.filter(
        (m) => m.title && m.material_type && m.url
      );

      await submitModuleWithMaterials({
        courseId: selectedCourseId,
        title,
        description,
        materialsPayload: validMaterials
      });

      // Reset form after successful submission
      setMaterialInputs([{ title: '', material_type: '', url: '' }]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoadingSubmit(false);
    }
  };

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

          <form className="space-y-5 mt-5" onSubmit={handleFormSubmit}>
            <div>
              <label>Select Course</label>
              <select
                className="bg-[#1C1C30] border border-[#363863] w-full p-2 mt-1"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {loadingCourses ? (
                  <option>Loading courses...</option>
                ) : (
                  <>
                    <option value="" disabled>Select a course</option>
                    {courseOptions}
                  </>
                )}
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
                className="bg-[#1C1C30] border border-[#363863] md:w-5/6 w-full p-2 mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mt-8">
              <p className="font-bold">Materials</p>
              {materialInputs.map((input, idx) => (
                <div key={idx} className="space-y-5 mt-2">
                  <input
                    type="text"
                    placeholder="Material Title"
                    value={input.title}
                    onChange={(e) => handleMaterialChange(idx, 'title', e.target.value)}
                    className="w-full p-2 bg-[#1C1C30] border border-[#363863]"
                  />
                  <select
                    value={input.material_type}
                    onChange={(e) => handleMaterialChange(idx, 'material_type', e.target.value)}
                    className="w-full p-2 bg-[#1C1C30] border border-[#363863]"
                  >
                    <option value="">Select Material Type</option>
                    <option value="video">Video</option>
                    <option value="slides">Slides</option>
                    <option value="text">Text</option>
                    <option value="link">Link</option>
                  </select>
                  <input
                    type="url"
                    placeholder="Material URL"
                    value={input.url}
                    onChange={(e) => handleMaterialChange(idx, 'url', e.target.value)}
                    className="w-full p-2 bg-[#1C1C30] border border-[#363863]"
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddMaterialField} className="mt-5 bg-[#262645] px-4 py-2 rounded-md">
                ➕ Add Another Material
              </button>
            </div>

            <div className="flex flex-row-reverse gap-4 mt-5">
              <button
                type="submit"
                className="bg-[#4045E0] rounded-md p-3 disabled:opacity-50"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" className="bg-[#262645] rounded-md p-3">
                Cancel
              </button>
            </div>
          </form>

          {message && <p className="text-green-400 mt-2">{message}</p>}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreatingCourse;
