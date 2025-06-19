// useCourseModuleManager.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';

const useCourseModuleManager = () => {
  const token = localStorage.getItem('accessToken');

  const [collapsed, setCollapse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null); 
  const [loadingCourses, setLoadingCourses] = useState(true); // NEW


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
        setLoadingCourses(true); 
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
      }finally {
        setLoadingCourses(false); 
      }
    };

    fetchCourses();
  }, [token]);

  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchModules = async () => {
      try {
        const res = await axios.get(`${base_url}api/courses/${selectedCourseId}/modules/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(res.data.results);
        if (res.data.results.length > 0) {
          setSelectedModuleId(res.data.results[0].id); 
        }
      } catch (err) {
        console.error('Failed to fetch modules', err);
        setErrorMessage("Failed to fetch modules");
      }
    };

    fetchModules();
  }, [selectedCourseId]);

  const submitModuleWithMaterials = async ({ materialsPayload }) => {
    if (!selectedCourseId) {
      setErrorMessage('Please select a course.');
      return;
    }

    try {
      const res = await axios.post(
        `${base_url}api/courses/${selectedCourseId}/modules/`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newModuleId = res.data.id;
      setModules(prev => [...prev, res.data]);
      setSelectedModuleId(newModuleId);

      for (const material of materialsPayload) {
        await axios.post(
          `${base_url}api/courses/${selectedCourseId}/modules/${newModuleId}/materials/`,
          material,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setTitle('');
      setDescription('');
      setMessage('Module and materials submitted successfully!');
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.message || 'Submission failed';
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
    submitModuleWithMaterials,
    token,
    loadingCourses, 
    setLoadingCourses
  };
};

export default useCourseModuleManager;