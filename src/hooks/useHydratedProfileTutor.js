import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
// import { useNavigate } from 'react-router';
import useAuthenticatedUser from './useAuthenticatedUser';

export default function useHydratedProfileTutor() {
    // const navigate = useNavigate();
    const { user, loadingUser, userError } = useAuthenticatedUser();
    const email = user?.email;

    console.log("tutor email", email);

    const [formData, setFormData] = useState({

        fullName: "",
        email: email || "",
        phone: "",
        gender: "",
        city: "",
        nationality: "",
        country: "",
        dob: "",
        profilePicture: "",
        education_level: "",
        current_role: "",
        industry: "",
        linkedin_profile: "",
        years_of_experience: "",
        specialization: "",
        preferred_learner_level: "",


        // skills: "", 
        // professional_bio: "", 

        name_of_certificate: "",
        issuing_organization: "",
        date_obtained: "",
    });

    const [profile, setProfile] = useState(null);
    const [profileId, setProfileId] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState(null);
    const [saving, setSaving] = useState(false);


    const [certifications, setCertifications] = useState([]);
    const [loadingCertifications, setLoadingCertifications] = useState(false);
    const [savingCertification, setSavingCertification] = useState(false);


    useEffect(() => {
        if (user?.email) {
            setFormData((prev) => ({
                ...prev,
                email: user.email,
            }));
            setUserEmail(user.email);
        }
    }, [user]);

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
            const response = await axios.get(`${base_url}api/userProfile/tutor_profile/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            const result = response.data;
            console.log("Tutor Profile Data", result);

            const profiles = result.results || [];

            const matchedProfile = profiles.find(
                (item) =>
                    item.tutor?.id === userId ||
                    item.tutor?.email?.toLowerCase() === email?.toLowerCase() ||
                    item.username?.toLowerCase() === email?.toLowerCase()
            );

            if (!matchedProfile) {
                setProfileError('Profile not found. Please create a profile.');
                setProfileId(null);
                setProfile(null);

                setFormData(prev => ({
                    ...prev,
                    email: email,
                    fullName: user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : ""
                }));
            } else {
                const tutorProfile = matchedProfile;
                console.log('Matched Tutor Profile:', tutorProfile.id);

                setProfileId(tutorProfile.id);
                setProfile(tutorProfile);


                setFormData({
                    fullName: `${tutorProfile.tutor?.first_name || ""} ${tutorProfile.tutor?.last_name || ""}`.trim(),
                    email: tutorProfile.tutor?.email || email,
                    phone: tutorProfile.phone_number || "",
                    gender: tutorProfile.gender || "",
                    city: tutorProfile.city || "",
                    nationality: tutorProfile.nationality || "",
                    country: tutorProfile.country || "",
                    dob: tutorProfile.date_of_birth || "",
                    profilePicture: tutorProfile.profile_picture || "",
                    education_level: tutorProfile.education_level || "",
                    current_role: tutorProfile.current_role || "",
                    industry: tutorProfile.industry || "",
                    linkedin_profile: tutorProfile.linkedin_profile || "",
                    years_of_experience: tutorProfile.years_of_experience || "",
                    specialization: tutorProfile.specialization || "",
                    preferred_learner_level: tutorProfile.preferred_learner_level || "",


                    // skills: "", 
                    // professional_bio: "", 

                    name_of_certificate: "",
                    issuing_organization: "",
                    date_obtained: "",
                });
                setProfileError(null);
            }
        } catch (err) {
            console.error("Error fetching tutor profile:", err);
            const message = err.response?.data?.detail || err.message;
            setProfileError(
                err.response?.status === 401
                    ? 'Session expired. Please log in again.'
                    : err.response?.status === 404
                        ? 'Profile not found. Please create a profile.'
                        : message || 'Failed to fetch profile.'
            );
            setProfileId(null);
            setProfile(null);
        } finally {
            setLoadingProfile(false);
        }
    };


    const fetchCertifications = async () => {
        if (!profile) return;

        const token = localStorage.getItem('accessToken');
        setLoadingCertifications(true);

        try {
            const response = await axios.get(
                `${base_url}api/userProfile/certification/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            console.log("Certifications Data", response.data);
            setCertifications(response.data.results || response.data || []);
        } catch (error) {
            console.error("Error fetching certifications:", error);
        } finally {
            setLoadingCertifications(false);
        }
    };


    const addCertification = async (certificationData) => {
        if (!profile) return;

        const token = localStorage.getItem('accessToken');
        setSavingCertification(true);

        try {
            const response = await axios.post(
                `${base_url}api/userProfile/certification/`,
                {
                    ...certificationData,
                    tutor_profile: profile.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            console.log("Certification created:", response.data);

            await fetchCertifications();


            setFormData(prev => ({
                ...prev,
                name_of_certificate: "",
                issuing_organization: "",
                date_obtained: ""
            }));

            return { success: true, message: "Certification added successfully!" };

        } catch (error) {
            console.error("Error creating certification:", error);
            return {
                success: false,
                message: error.response?.data?.detail || "Failed to add certification."
            };
        } finally {
            setSavingCertification(false);
        }
    };


    const deleteCertification = async (certificationId) => {
        const token = localStorage.getItem('accessToken');

        try {
            await axios.delete(
                `${base_url}api/userProfile/certification/${certificationId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Certification deleted");

            await fetchCertifications();
            return { success: true, message: "Certification deleted successfully!" };

        } catch (error) {
            console.error("Error deleting certification:", error);
            return {
                success: false,
                message: error.response?.data?.detail || "Failed to delete certification."
            };
        }
    };


    const handleAddCertification = async (e) => {
        if (e) e.preventDefault();

        const certificationData = {
            name: formData.name_of_certificate,
            issuing_organization: formData.issuing_organization,
            date_obtained: formData.date_obtained || null,
        };


        if (!certificationData.name) {
            return { success: false, message: "Certificate name is required." };
        }

        return await addCertification(certificationData);
    };

    // Save/Update profile
    const handleSaveProfile = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        setProfileError(null);

        const profileData = {
            profile_picture: formData.profilePicture || "",
            phone_number: formData.phone || "",
            gender: formData.gender || "",
            date_of_birth: formData.dob || null,
            city: formData.city || "",
            country: formData.country || "",
            nationality: formData.nationality || "",
            status: "active",
            education_level: formData.education_level || "",
            current_role: formData.current_role || "",
            industry: formData.industry || "",
            linkedin_profile: formData.linkedin_profile || "",
            years_of_experience: formData.years_of_experience || "",
            specialization: formData.specialization || "",
            preferred_learner_level: formData.preferred_learner_level || "",
        };

        const token = localStorage.getItem('accessToken');

        try {
            if (profile && profile.id) {
                // PATCH existing profile
                const response = await axios.patch(
                    `${base_url}api/userProfile/tutor_profile/${profile.id}/`,
                    profileData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Profile updated:", response.data);
                setProfile(response.data);
                return { success: true, message: "Profile updated successfully!" };
            } else {
                // POST a new profile
                const response = await axios.post(
                    `${base_url}api/userProfile/tutor_profile/`,
                    profileData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Profile created:", response.data);
                setProfile(response.data);
                setProfileId(response.data.id);
                return { success: true, message: "Profile created successfully!" };
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            const message = error.response?.data?.detail || "Failed to save profile.";
            setProfileError(message);
            return { success: false, message };
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Map frontend field names to backend field names
        let fieldName = id;
        switch (id) {
            case "Name of Certificate":
                fieldName = "name_of_certificate";
                break;
            case "Issuing Organizzation":
                fieldName = "issuing_organization";
                break;
            case "Date Obtained":
                fieldName = "date_obtained";
                break;
            case "Specialization":
                fieldName = "specialization";
                break;
            case "Preferred Learner Level":
                fieldName = "preferred_learner_level";
                break;
            default:
                fieldName = id;
        }

        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };


    useEffect(() => {
        if (!loadingUser && user) {
            fetchProfile();
        }
    }, [loadingUser, user]);


    useEffect(() => {
        if (profile) {
            fetchCertifications();
        }
    }, [profile]);

    return {

        formData,
        user,
        setFormData,
        profile,
        profileId,
        userEmail,
        userId: user?.id,

        loading: loadingUser || loadingProfile,
        loadingCertifications,
        savingCertification,
        saving,

        error: profileError,
        setError: setProfileError,

        refetchProfile: fetchProfile,
        handleSaveProfile,
        handleChange,

        certifications,
        setCertifications,
        fetchCertifications,
        addCertification,
        deleteCertification,
        handleAddCertification,
    };
}