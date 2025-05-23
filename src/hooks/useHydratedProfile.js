import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
import { useNavigate } from 'react-router';
import useAuthenticatedUser from './useAuthenticatedUser';

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

  const [profileId, setProfileId] = useState(null); // <-- add this
  const [userEmail, setUserEmail] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const navigate = useNavigate();

  const { user, loadingUser, userError } = useAuthenticatedUser();

  const fetchProfile = async () => {
    if (loadingUser || !user) return;
  
    if (userError) {
      setProfileError(userError);
      setLoadingProfile(false);
      return;
    }
  

      const token = localStorage.getItem('accessToken');
      const userId = user.id;
      const email = user.email;
      
      

      setUserEmail(email);
      

      try {
        const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profiles = res.data.results || [];

        const matchedProfile = profiles.find(
          (item) =>
            item.student?.id === userId ||
            item.student?.email?.toLowerCase() === email.toLowerCase() ||
            item.username?.toLowerCase() === email.toLowerCase()
        );

        if (!matchedProfile) {
          setProfileError('Profile not found. Please create a profile.');
          setProfileId(null);
        } else {
          const profile = matchedProfile;

          setProfileId(profile.studentId || profile.id); // <-- store profile ID here

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
        }
      } catch (err) {
        const message = err.response?.data?.detail || err.message;
        setProfileError(
          err.response?.status === 401
            ? 'Session expired. Please log in again.'
            : message || 'Failed to fetch profile.'
        );
        setProfileId(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    
    useEffect(() => {
        fetchProfile(); // useEffect just calls it once initially
      }, [user, loadingUser, userEmail, userError]);

  return {
    formData,
    setFormData,
    userEmail,
    userId: user?.id,
    profileId,        // <-- return profile ID
    loading: loadingUser || loadingProfile,
    error: profileError,
    setError: setProfileError,
    refetchProfile: fetchProfile,
  };
}


