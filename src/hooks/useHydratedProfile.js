// hooks/useHydratedProfile.js or .ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
import { getCurrentUserId } from '../lib/utilityCurrent';

export default function useHydratedProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    city: '',
    nationality: '',
    country: '',
    dob: '',
    profilePicture: null,
    education_level: '',
    current_role: '',
    industry: '',
    linkedin_profile: '',
  });
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      const userId = getCurrentUserId();

      if (!token || !userId) {
        setError('No valid session. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profiles = res.data.results.filter(
          (item) =>
            (item.student?.id && item.student.id === userId) ||
            (item.student?.email && item.student.email.toLowerCase() === userId.toLowerCase()) ||
            (item.username && item.username.toLowerCase() === userId.toLowerCase())
        );

        if (profiles.length > 1) {
          setError('Multiple profiles found. Please contact support.');
          setLoading(false);
          return;
        }

        if (profiles.length === 1) {
          const profile = profiles[0];
          const email = profile.student?.email || profile.email || profile.username || '';
          setUserEmail(email);

          setFormData({
            fullName: [profile.student?.first_name ?? '', profile.student?.last_name ?? '']
              .filter(Boolean)
              .join(' ')
              .trim(),
            phone: profile.phone_number || '',
            gender: profile.gender || '',
            city: profile.city || '',
            nationality: profile.nationality || '',
            country: profile.country || '',
            dob: profile.date_of_birth || '',
            profilePicture: profile.profile_picture || null,
            education_level: profile.education_level || '',
            current_role: profile.current_role || '',
            industry: profile.industry || '',
            linkedin_profile: profile.linkedin_profile || '',
          });
        } else {
          setError('Profile not found. Please create a profile.');
        }
      } catch (err) {
        const responseMessage = err.response?.data?.detail || err.message;
        setError(
          err.response?.status === 401
            ? 'Session expired. Please log in again.'
            : responseMessage || 'Failed to fetch profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { formData, setFormData, userEmail, loading, error, setError };
}
