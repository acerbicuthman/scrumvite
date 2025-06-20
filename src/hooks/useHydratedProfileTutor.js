import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../library/api';
// import { useNavigate } from 'react-router';
import useAuthenticatedUser from './useAuthenticatedUser';
import { supabase } from '../SupabaseFile';

export default function useHydratedProfileTutor() {
    // const navigate = useNavigate();
    const { user, loadingUser, userError } = useAuthenticatedUser();
    const email = user?.email;

    // console.log("tutor email", email);


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
        professional_bio: "",

        // Certification form fields (handled separately via Certification model)
        name_of_certificate: "",
        issuing_organization: "",
        date_obtained: "",
        certificate_picture: "",
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
    const [uploadingCertificateImage, setUploadingCertificateImage] = useState(false);


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
            // console.log("Tutor Profile Data", result);

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
                    professional_bio: tutorProfile.professional_bio || "",

                    // Certification form fields
                    name_of_certificate: "",
                    issuing_organization: "",
                    date_obtained: "",
                    certificate_picture: "",
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

    // Profile image upload function
    const handleProfileImageUpload = async (file) => {
        if (!file || !file.type.startsWith("image/")) {
            setProfileError("Please upload a valid image file.");
            return { success: false, message: "Invalid file type" };
        }

        if (file.size > 5 * 1024 * 1024) {
            setProfileError("Image must be under 5MB.");
            return { success: false, message: "File too large" };
        }

        const userId = user?.id;
        if (!userId) {
            setProfileError("No valid user ID for image upload.");
            return { success: false, message: "No user ID" };
        }

        const safeUserId = userId.toString().replace(/[@.]/g, "_");
        const fileName = `user_${safeUserId}/${Date.now()}_${file.name}`;

        try {
            // Delete old profile picture if exists
            if (formData.profilePicture) {
                const oldFileName = formData.profilePicture.split("/").pop();
                if (oldFileName) {
                    await supabase.storage
                        .from("img-profile")
                        .remove([`user_${safeUserId}/${oldFileName}`]);
                }
            }

            // Upload new image
            const { error: uploadError } = await supabase.storage
                .from("img-profile")
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: true,
                    contentType: file.type,
                });

            if (uploadError) {
                setProfileError("Image upload failed: " + uploadError.message);
                return { success: false, message: uploadError.message };
            }

            const { data: urlData } = supabase.storage
                .from("img-profile")
                .getPublicUrl(fileName);

            if (!urlData?.publicUrl) {
                setProfileError("Failed to retrieve uploaded image URL.");
                return { success: false, message: "Failed to get URL" };
            }

            setFormData((prev) => ({ ...prev, profilePicture: urlData.publicUrl }));
            setProfileError(null);
        

            return { success: true, url: urlData.publicUrl };

        } catch (err) {
            console.error("Profile image upload error:", err);
            setProfileError("Unexpected error during image upload.");
            return { success: false, message: "Unexpected error" };
        }
    };

    // Certificate image upload function
    const handleCertificateImageUpload = async (file) => {
        if (!file || !file.type.startsWith("image/")) {
            setProfileError("Please upload a valid image file.");
            return { success: false, message: "Invalid file type" };
        }

        if (file.size > 5 * 1024 * 1024) {
            setProfileError("Image must be under 5MB.");
            return { success: false, message: "File too large" };
        }

        const userId = user?.id;
        if (!userId) {
            setProfileError("No valid user ID for image upload.");
            return { success: false, message: "No user ID" };
        }

        const safeUserId = userId.toString().replace(/[@.]/g, "_");
        const fileName = `user_${safeUserId}/certificates/${Date.now()}_${file.name}`;

        setUploadingCertificateImage(true);

        try {
            const { error: uploadError } = await supabase.storage
                .from("img-profile")
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: true,
                    contentType: file.type,
                });

            if (uploadError) {
                setProfileError("Certificate image upload failed: " + uploadError.message);
                return { success: false, message: uploadError.message };
            }

            const { data: urlData } = supabase.storage
                .from("img-profile")
                .getPublicUrl(fileName);

            if (!urlData?.publicUrl) {
                setProfileError("Failed to retrieve uploaded certificate image URL.");
                return { success: false, message: "Failed to get URL" };
            }

            setFormData((prev) => ({ ...prev, certificate_picture: urlData.publicUrl }));
            setProfileError(null);

            return { success: true, url: urlData.publicUrl };
            

        } catch (err) {
            console.error("Certificate image upload error:", err);
            setProfileError("Unexpected error during certificate image upload.");
            return { success: false, message: "Unexpected error" };
        } finally {
            setUploadingCertificateImage(false);
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
            const dataToSend = {
                ...certificationData,
                tutor_profile: profile.id
            };

            console.log("Sending certification data:", dataToSend);

            const response = await axios.post(
                `${base_url}api/userProfile/certification/`,
                dataToSend,
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
                date_obtained: "",
                certificate_picture: ""
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
            certificate_picture: formData.certificate_picture || "",
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
            professional_bio: formData.professional_bio || "",
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
        uploadingCertificateImage,

        error: profileError,
        setError: setProfileError,

        refetchProfile: fetchProfile,
        handleSaveProfile,
        handleChange,
        handleProfileImageUpload,
        handleCertificateImageUpload,

        certifications,
        setCertifications,
        fetchCertifications,
        addCertification,
        deleteCertification,
        handleAddCertification,
    };
}