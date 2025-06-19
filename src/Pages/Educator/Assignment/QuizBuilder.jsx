import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../library/api';
import useCourseModuleManager from '../../../hooks/useCourseModuleManager';

const QuizBuilder = () => {
  const {
    selectedCourseId,
    setSelectedCourseId,
    token,
    courses,
  } = useCourseModuleManager();

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
  const [questionData, setQuestionData] = useState([
    {
      question_text: '',
      question_type: 'multiple_choice',
      points: 10,
      order: 1,
      explanation: '',
      options: Array(4).fill().map((_, i) => ({
        option_text: '',
        is_correct: false,
        order: i + 1,
      })),
    },
  ]);

  // Fetch assignments when course changes
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!selectedCourseId) return;
  
      try {
        const res = await axios.get(
          `${base_url}api/courses/${selectedCourseId}/assignments/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        console.log("Fetched assignments:", res.data);
  
        const assignmentList = Array.isArray(res.data)
          ? res.data
          : res.data.results || res.data.assignments || [];
  
        setAssignments(assignmentList);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setAssignments([]); 
      }
    };
  
    fetchAssignments();
  }, [selectedCourseId, token]);
  

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

  const submitQuestion = async (course_pk, assignment_pk) => {
    try {
      for (let index = 0; index < questionData.length; index++) {
        const question = questionData[index];
        const payload = {
          question_text: question.question_text,
          question_type: question.question_type,
          points: question.points,
          order: index + 1,
          explanation: question.explanation,
          options: question.options.map((opt, i) => ({
            option_text: opt.option_text,
            is_correct: opt.is_correct,
            order: i + 1,
          })),
        };
  
        await axios.post(
          `${base_url}api/courses/${course_pk}/assignments/${assignment_pk}/questions/`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
  
      // ✅ Reset the form after success
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
    } catch (err) {
      console.error("Failed to submit question", err.response?.data || err.message);
    }
  };
  

  const createAssignmentIfNeeded = async () => {
    if (selectedAssignmentId) return selectedAssignmentId;

    if (!newAssignmentTitle.trim()) {
      alert("Please enter a title for the new assignment.");
      return null;
    }

    try {
      const res = await axios.post(
        `${base_url}api/courses/${selectedCourseId}/assignments/`,
        {
          title: newAssignmentTitle,
          description: "Generated from QuizBuilder",
          due_date: new Date().toISOString(), // set default due date
          assignment_type: "quiz",
          instructions: "Answer all questions",
          max_attempts: 1,
          time_limit_minutes: 30,
          total_points: 100,
          is_published: true
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newAssignment = res.data;
      setAssignments((prev) => [...prev, newAssignment]);
      setSelectedAssignmentId(newAssignment.id);
      return newAssignment.id;
    } catch (err) {
      console.error("Failed to create assignment", err.response?.data || err.message);
      return null;
    }
  };

  const handleQuizSubmit = async () => {
    if (!selectedCourseId) {
      alert("Select a course first.");
      return;
    }

    const assignmentId = await createAssignmentIfNeeded();
    if (!assignmentId) return;

    for (let i = 0; i < questionData.length; i++) {
      await submitQuestion(selectedCourseId, assignmentId, questionData[i], i);
    }

    alert("Quiz submitted successfully!");

  
  };

  return (
    <div className="text-white mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-6">Quiz Builder</h2>

      {/* Select Course */}
      <div className="mb-4">
        <label className="block mb-1">Select Course</label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full p-2 bg-[#1C1C30] border border-[#363863] rounded"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Assignment Selection or New */}
      <div className="mb-6">
        <label className="block mb-1">Select Assignment</label>
        <select
          value={selectedAssignmentId}
          onChange={(e) => setSelectedAssignmentId(e.target.value)}
          className="w-full p-2 bg-[#1C1C30] border border-[#363863] rounded"
        >
          <option value="">-- Create New Assignment --</option>
          {assignments.map((a) => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>

        {!selectedAssignmentId && (
          <input
            type="text"
            value={newAssignmentTitle}
            onChange={(e) => setNewAssignmentTitle(e.target.value)}
            placeholder="New Assignment Title"
            className="w-full mt-2 p-2 bg-[#1C1C30] border border-[#363863] rounded"
          />
        )}
      </div>

      {/* Questions */}
      {questionData.map((q, qIndex) => (
        <div key={qIndex} className="mb-8 border border-[#363863] p-4 rounded-lg">
          <label className="block mb-1">Question {qIndex + 1}</label>
          <textarea
            className="w-full bg-[#1C1C30] p-2 mb-3 rounded border border-[#363863]"
            value={q.question_text}
            onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
            placeholder="Enter your question..."
          />

          {q.options.map((opt, optIndex) => (
            <div key={optIndex} className="flex items-center mb-2">
              <input
                type="text"
                className="flex-1 bg-[#1C1C30] p-2 mr-2 rounded border border-[#363863]"
                value={opt.option_text}
                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                placeholder={`Option ${optIndex + 1}`}
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

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          type="button"
          className="bg-[#262645] hover:bg-[#3a3a65] px-4 py-2 rounded"
          onClick={() =>
            setQuestionData([
              ...questionData,
              {
                question_text: '',
                question_type: 'multiple_choice',
                points: 10,
                order: questionData.length + 1,
                explanation: '',
                options: Array(4).fill().map((_, i) => ({
                  option_text: '',
                  is_correct: false,
                  order: i + 1,
                })),
              },
            ])
          }
        >
          ➕ Add Question
        </button>

        <button
          type="button"
          className="bg-[#4045E0] hover:bg-blue-500 px-5 py-2 rounded"
          onClick={handleQuizSubmit}
        >
          ✅ Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizBuilder;
