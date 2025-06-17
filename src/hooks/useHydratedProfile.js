import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
import { useNavigate } from 'react-router';
import useAuthenticatedUser from './useAuthenticatedUser';
import { supabase } from '../../src/SupabaseFile';

export default function useHydratedProfile() {
  const navigate = useNavigate();
  const { user, loadingUser, setLoadingUser, userError } = useAuthenticatedUser();
  const userId = user?.id;
  const email = user?.email;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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

  const [localError, setLocalError] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const fetchedOnce = useRef(false);

  const getPublicImageUrl = (path) => {
    const { data } = supabase.storage.from('img-profile').getPublicUrl(path);
    return data?.publicUrl ?? null;
  };

  const handleImageChange = useCallback(async (file) => {
    setLocalError(null);
    if (!file || !file.type.startsWith('image/')) return setLocalError('Please upload a valid image file.');
    if (file.size > 5 * 1024 * 1024) return setLocalError('Image must be under 5MB.');
    if (!userId) return setLocalError('No valid user ID for image upload.');

    const fileName = `user_${userId}/${Date.now()}_${file.name}`;

    try {
      const oldUrl = formData.profilePicture;
      if (oldUrl?.startsWith('http')) {
        const oldFileName = oldUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('img-profile').remove([`user_${userId}/${oldFileName}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('img-profile')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) return setLocalError('Image upload failed: ' + uploadError.message);

      const publicUrl = getPublicImageUrl(fileName);
      if (!publicUrl) return setLocalError('Failed to retrieve uploaded image URL.');

      setFormData((prev) => ({ ...prev, profilePicture: publicUrl }));
    } catch (err) {
      console.error('Image upload error:', err);
      setLocalError('Unexpected error during image upload.');
    }
  }, [formData.profilePicture, userId]);

  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);
    if (!user || !userId || userError) {
      setProfileError(userError || 'No authenticated user.');
      setLoadingProfile(false);
      return;
    }

    const token = localStorage.getItem('accessToken');
    try {
      const res = await axios.get(`${base_url}api/userProfile/student_profile/get_student_profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = res.data;
      const profile = Array.isArray(data?.results) ? data.results[0] : data;

      if (!profile || !profile.studentId) {
        setProfileError('Profile not found. Please create a profile.');
        setProfileId(null);
        return;
      }

      setProfileId(profile.studentId);

      const profilePictureUrl = profile.profile_picture?.startsWith('http')
        ? profile.profile_picture
        : getPublicImageUrl(profile.profile_picture);

      const fullName = [profile.student?.first_name, profile.student?.last_name]
        .filter(Boolean)
        .join(' ')
        .trim();

      setFormData({
        fullName,
        email: profile.email ?? email ?? '',
        phone: profile.phone_number ?? '',
        gender: profile.gender ?? '',
        city: profile.city ?? '',
        nationality: profile.nationality ?? '',
        country: profile.country ?? '',
        dob: profile.date_of_birth ?? '',
        profilePicture: profilePictureUrl,
        education_level: profile.education_level ?? '',
        current_role: profile.current_role ?? '',
        industry: profile.industry ?? '',
        linkedin_profile: profile.linkedin_profile ?? '',
      });
    } catch (err) {
      const message = err.response?.data?.detail || err.message;
      setProfileError(
        err.response?.status === 401 ? 'Session expired. Please log in again.' : message || 'Failed to fetch profile.'
      );
      setProfileId(null);
    } finally {
      setLoadingProfile(false);
    }
  }, [user, userId, userError, email]);

  useEffect(() => {
    if (!loadingUser && user && !fetchedOnce.current) {
      fetchedOnce.current = true;
      fetchProfile();
    }
  }, [loadingUser, user, fetchProfile]);

  return {
    formData,
    setFormData,
    userEmail: email,
    userId,
    profileId,
    loading: loadingUser || loadingProfile,
    setLoading: setLoadingUser,
    error: profileError,
    localError,
    setLocalError,
    setError: setProfileError,
    refetchProfile: fetchProfile,
    handleImageChange,
  };
}
