import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
import { useNavigate } from 'react-router';
import useAuthenticatedUser from './useAuthenticatedUser';
import { supabase } from '../../src/SupabaseFile';

export default function useHydratedProfile() {
  const navigate = useNavigate();
  const { user, loadingUser, userError } = useAuthenticatedUser();
  const email = user?.email;
  const safeUserId = user?.id;

  const [formData, setFormData] = useState({
    fullName: '',
    email: email,
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
    linkedin_profile: ''
  });

  const [localError, setLocalError] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
      setUserEmail(user.email);
    }
  }, [user]);
  // Image Upload Handler
  const handleImageChange = async (file) => {
    setLocalError(null);
    if (!file || !file.type.startsWith('image/')) {
      return setLocalError('Please upload a valid image file.');
    }
    if (file.size > 5 * 1024 * 1024) {
      return setLocalError('Image must be under 5MB.');
    }
    if (!safeUserId) {
      return setLocalError('No valid user ID for image upload.');
    }

    const fileName = `user_${safeUserId}/${Date.now()}_${file.name}`;

    try {
      if (formData.profilePicture) {
        const oldFileName = formData.profilePicture.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('img-profile')
            .remove([`user_${safeUserId}/${oldFileName}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('img-profile')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        return setLocalError('Image upload failed: ' + uploadError.message);
      }

      const { data: urlData } = supabase.storage
        .from('img-profile')
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) {
        return setLocalError('Failed to retrieve uploaded image URL.');
      }

      setFormData((prev) => ({
        ...prev,
        profilePicture: urlData.publicUrl,
      }));
    } catch (err) {
      console.error('Image upload error:', err);
      setLocalError('Unexpected error during image upload.');
    }
  };


  const fetchProfile = async () => {
    if (loadingUser || !user) return;

    if (userError) {
      setProfileError(userError);
      setLoadingProfile(false);
      return;
    }

    const token = localStorage.getItem('accessToken');
    const userId = user.id;

    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/`, {
        headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
       },
       
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
        setProfileId(profile.studentId);
        
        let profilePictureUrl = profile.profile_picture || null;

        if (profilePictureUrl && !profilePictureUrl.startsWith('http')) {
          const { data: urlData } = supabase.storage
            .from('img-profile')
            .getPublicUrl(profilePictureUrl);
          profilePictureUrl = urlData?.publicUrl || null;
        }
        
        setFormData({
          fullName: [profile.student?.first_name ?? '', profile.student?.last_name ?? '']
            .filter(Boolean)
            .join(' ')
            .trim(),
          email: profile.email ?? user.email ?? '',
          phone: profile.phone_number ?? '',
          gender: profile.gender ?? '',
          city: profile.city || '',
          nationality: profile.nationality || '',
          country: profile.country || '',
          dob: profile.date_of_birth || '',
          profilePicture: profilePictureUrl,
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
    if (!loadingUser && user) {
      fetchProfile();
    }
  }, [loadingUser, user]);

  
  return {
    formData,
    setFormData,
    userEmail,
    userId: safeUserId,
    profileId,
    loading: loadingUser || loadingProfile,
    error: profileError,
    localError,
    setError: setProfileError,
    refetchProfile: fetchProfile,
    handleImageChange, 
  };
}
