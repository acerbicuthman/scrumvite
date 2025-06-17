import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';

const useCourseModuleManager = () => {
  const token = localStorage.getItem('accessToken');

  const [collapsed, setCollapse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null); // ✅ NEW

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchModules = async () => {
      try {
        const res = await axios.get(`${base_url}api/courses/${selectedCourseId}/modules/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched modules:", res.data); 
        setModules(res.data.results);
        if (res.data.length > 0) {
          setSelectedModuleId(res.data[0].id); // ✅ Optionally default select first
        }
      } catch (err) {
        console.error('Failed to fetch modules', err);
        setErrorMessage("ailed to fetch modules")
      }
    };

    fetchModules();
  }, [selectedCourseId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${base_url}api/courses/my_courses/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
        if (res.data.length > 0) {
          setSelectedCourseId(res.data[0].id);
        }
      } catch (err) {
        console.error('Error fetching courses', err.response?.data || err.message);
        setErrorMessage('Error fetching courses');
      }
    };

    fetchCourses();
  }, [token]);

  const createModule = async (e) => {
    e.preventDefault();

    if (!selectedCourseId) {
      alert('Please select a course.');
      return;
    }

    try {
      const res = await axios.post(
        `${base_url}api/courses/${selectedCourseId}/modules/`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Module created successfully!');
      setTitle('');
      setDescription('');
      setModules(prev => [...prev, res.data]);
      setSelectedModuleId(res.data.id); 
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.message || 'Something went wrong';
      setErrorMessage(`Error: ${errorMsg}`);
    }
  };

  return {
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
    token
  };
};

export default useCourseModuleManager;
