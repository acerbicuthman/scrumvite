import React, { useState, useEffect, useMemo } from 'react';
import AsideTutor from '../Dashboard/AsideTutor';
import axios from 'axios';
import { base_url } from '../../../library/api';
import useCourseModuleManager from '../../../hooks/useCourseModuleManager';

const Assignment = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dueDate, setDueDate] = useState('');

  const {
    collapsed,
    setCollapse,
    courses,
    selectedCourseId,
    setSelectedCourseId,
    token,
  } = useCourseModuleManager();

  const courseOptions = useMemo(() => (
    courses.map(course => (
      <option key={course.id} value={course.id}>{course.title}</option>
    ))
  ), [courses]);

  const [assignmentData, setAssignmentData] = useState({
    title: '',
    instruction: '',
    description: '',
    assignment_type: 'quiz',
  });

  const [questionData, setQuestionData] = useState([
    {
      question_text: '',
      question_type: 'multiple_choice',
      points: 10,
      order: 1,
      explanation: '',
      options: [
        { option_text: '', is_correct: false, order: 1 },
        { option_text: '', is_correct: false, order: 2 },
        { option_text: '', is_correct: false, order: 3 },
        { option_text: '', is_correct: false, order: 4 },
      ],
    },
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const req = await axios.get(`${base_url}api/courses/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const results = req.data;
        if (results.length > 0) {
          setSelectedCourseId(results[0].id);
        }
      } catch (error) {
        console.error('Error fetching courses:', error.response?.data || error.message);
      }
    };
    fetchCourses();
  }, [token]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questionData];
    updated[qIndex].options[optIndex].option_text = value;
    setQuestionData(updated);
  };

  const handleCorrectToggle = (qIndex, optIndex) => {
    const updated = [...questionData];
    updated[qIndex].options[optIndex].is_correct = !updated[qIndex].options[optIndex].is_correct;
    setQuestionData(updated);
  };

  const handleQuestionTextChange = (qIndex, value) => {
    const updated = [...questionData];
    updated[qIndex].question_text = value;
    setQuestionData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', assignmentData.title);
    formData.append('description', assignmentData.description);
    formData.append('instructions', assignmentData.instruction);
    formData.append('assignment_type', assignmentData.assignment_type);
    formData.append('due_date', new Date(dueDate).toISOString());
    formData.append('max_attempts', 3);
    formData.append('time_limit_minutes', 60);
    formData.append('total_points', 100);
    formData.append('is_published', true);
    formData.append('course', selectedCourseId);

    files.forEach(file => formData.append('attachments', file));

    try {
      const response = await axios.post(
        `${base_url}api/courses/${selectedCourseId}/assignments/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Full response:', response);
      console.log('✅ Response data:', response.data);
      
      setUploadedFiles(files.map((f) => f.name));

      // Submit each question
      for (const question of questionData) {
        await axios.post(`${base_url}api/assignments/${assignment_pk}/questions/`, question, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert('✅ Assignment and questions submitted!');
      setFiles([]);
      setUploadedFiles([]);
      setAssignmentData({
        title: '',
        instruction: '',
        description: '',
        assignment_type: 'quiz',
      });
      setQuestionData([
        {
          question_text: '',
          question_type: 'multiple_choice',
          points: 10,
          order: 1,
          explanation: '',
          options: [
            { option_text: '', is_correct: false, order: 1 },
            { option_text: '', is_correct: false, order: 2 },
            { option_text: '', is_correct: false, order: 3 },
            { option_text: '', is_correct: false, order: 4 },
          ],
        },
      ]);
      setDueDate('');
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('Error submitting assignment or questions');
    }
  };

  return (
    <div className='flex mt-20 text-white bg-[#121221]'>
      <aside>
        <AsideTutor collapsed={collapsed} setCollapse={setCollapse} />
      </aside>

      <main className={`p-6 transition-all duration-300 ${collapsed ? 'md:w-[calc(100%-90px)]' : 'md:w-[calc(100%-100px)]'}`}>
        <form onSubmit={handleSubmit}>

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

          <div className="my-4">
            <label className="block">Assignment Title</label>
            <input
              type="text"
              name="title"
              value={assignmentData.title}
              onChange={handleChange}
              className="bg-[#1C1C30] w-full px-4 py-2 rounded border border-[#363863]"
            />
          </div>

          <div className="my-4">
            <label className="block">Instruction</label>
            <textarea
              name="instruction"
              value={assignmentData.instruction}
              onChange={handleChange}
              className="bg-[#1C1C30] w-full h-32 px-4 py-2 rounded border border-[#363863]"
            />
          </div>

          <div className="my-4">
            <label className="block">Due Date</label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-[#1C1C30] border border-[#363863] rounded-lg px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="block">Attachments</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-white bg-[#1C1C30] border border-[#363863] rounded-lg px-4 py-2"
            />
            {files.map((file, idx) => <p key={idx}>📎 {file.name}</p>)}
          </div>

          <div className="my-4">
            <label className="block">Assignment Description</label>
            <textarea
              name="description"
              value={assignmentData.description}
              onChange={handleChange}
              className="bg-[#1C1C30] w-full h-32 px-4 py-2 rounded border border-[#363863]"
            />
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Quiz Builder</h2>

            {questionData.map((question, qIndex) => (
              <div key={qIndex} className="mb-8 p-4 border border-[#363863] rounded-lg">
                <label className="block mb-1">Question {qIndex + 1}</label>
                <textarea
                  className="w-full bg-[#1C1C30] p-2 mb-2 rounded border border-[#363863]"
                  value={question.question_text}
                  onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                />
                {question.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      className="flex-1 bg-[#1C1C30] p-2 mr-2 rounded border border-[#363863]"
                      value={opt.option_text}
                      onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                    />
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={opt.is_correct}
                        onChange={() => handleCorrectToggle(qIndex, optIndex)}
                        className="mr-1"
                      />
                      Correct
                    </label>
                  </div>
                ))}
              </div>
            ))}

            <button
              type="button"
              className="bg-[#4045E0] px-4 py-2 rounded"
              onClick={() => setQuestionData([
                ...questionData,
                {
                  question_text: '',
                  question_type: 'multiple_choice',
                  points: 10,
                  order: questionData.length + 1,
                  explanation: '',
                  options: [
                    { option_text: '', is_correct: false, order: 1 },
                    { option_text: '', is_correct: false, order: 2 },
                    { option_text: '', is_correct: false, order: 3 },
                    { option_text: '', is_correct: false, order: 4 },
                  ],
                }
              ])}
            >
              ➕ Add Question
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-[#4045E0] px-6 py-3 rounded text-white">
              Submit Assignment
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Assignment;
