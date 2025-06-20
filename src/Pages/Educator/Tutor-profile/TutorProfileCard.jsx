import React from 'react'
import { useState, useRef } from 'react'
import { supabase } from '../../../SupabaseFile'
import ProfileImgUpload from '../../../Pages/Learner/learner-profile/ProfileImgUpload'
import CountryForm from '../../../library/CountryForm'
import useHydratedProfileTutor from '../../../hooks/useHydratedProfileTutor'


const CertificateImageUpload = ({ onImageChange, defaultImage, disabled, uploadingImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    } else {
      console.error('Invalid file: Please select an image');
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-[200px] mx-auto">
      <div
        onClick={handleClick}
        className="h-[120px] w-full flex flex-col items-center justify-center border-2 border-dashed border-white/50 rounded-md relative cursor-pointer hover:border-white/70 transition-colors"
      >
        {defaultImage ? (
          <img
            src={defaultImage}
            alt="Certificate"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="text-center p-4">
            <p className="text-white/50 text-sm">
              {uploadingImage ? "Uploading..." : "Upload Certificate Image"}
            </p>
          </div>
        )}
      </div>

      {defaultImage && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // Clear the image
            if (onImageChange) {
              onImageChange(null);
            }
          }}
          className="mt-2 text-xs text-red-500 underline w-full text-center"
        >
          Remove Image
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled || uploadingImage}
        className="hidden"
      />
    </div>
  );
};

const TutorProfileCard = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [success, setSuccess] = useState("");

  const {
    formData,
    setFormData,
    user,
    profile,
    loading,
    loadingCertifications,
    savingCertification,
    saving,
    uploadingCertificateImage,
    error,
    setError,
    handleSaveProfile,
    handleChange,
    handleProfileImageUpload,
    handleCertificateImageUpload,
    certifications,
    handleAddCertification,
    deleteCertification,
  } = useHydratedProfileTutor();

  const localError = error;
  const safeUserId = user?.id;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccess("");
  };

  const handleSaveProfileWrapper = async (e) => {
    e.preventDefault();
    try {
      await handleSaveProfile(e);
      setSuccess("Profile saved successfully!");
      setIsEditing(false);
    } catch (error) {
    }
  };

  const handleAddCertificationWrapper = async (e) => {
    e.preventDefault();
    try {
      await handleAddCertification(e);
      setSuccess("Certification added successfully!");
    } catch (error) {
    }
  };

  const handleDeleteCertificationWrapper = async (certificationId) => {
    try {
      await deleteCertification(certificationId);
      setSuccess("Certification deleted successfully!");
    } catch (error) {
    }
  };



  const handleImageChange = async (file) => {
    const result = await handleProfileImageUpload(file);
    if (result.success) {
      setSuccess("Profile image uploaded successfully!");
    }
    // Error handling is already done in the hook
  };

  const handleCertificateImageChange = async (file) => {
    if (!file) {
      // Handle image removal
      setFormData((prev) => ({ ...prev, certificate_picture: "" }));
      setSuccess("Certificate image removed!");
      return;
    }

    const result = await handleCertificateImageUpload(file);
    if (result.success) {
      setSuccess("Certificate image uploaded successfully!");
    }
    // Error handling is already done in the hook
  };


  const renderInputField = (id, label, type = "text", disabled = false) => {
    let valueKey = id;
    switch (id) {
      case "Name of Certificate":
        valueKey = "name_of_certificate";
        break;
      case "Issuing Organizzation":
        valueKey = "issuing_organization";
        break;
      case "Date Obtained":
        valueKey = "date_obtained";
        break;
      case "Specialization":
        valueKey = "specialization";
        break;
      case "Preferred Learner Level":
        valueKey = "preferred_learner_level";
        break;
      default:
        valueKey = id;
    }

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium mb-1 capitalize text-white/50">
          {label || id.replace("_", " ")}
        </label>
        <input
          id={id}
          type={type}
          value={formData[valueKey] || ""}
          onChange={handleChange}
          readOnly={!isEditing || disabled}
          placeholder={`Enter ${label || id.replace(/_/g, ' ')}`}
          className="bg-white bg-opacity-10 w-full rounded-sm p-2 placeholder-white/50"
        />
      </div>
    );
  };
  if (loading) {
    return <div className="flex justify-center items-center my-8 h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4318D1]" />
    </div>;
  }

  if (
    localError &&
    localError !== "Profile not found. Please create a profile."
  ) {
    return <div className="text-red-600 text-xl text-center mt-28 h-screen">{localError}</div>;
  }
  return (
    <div className="w-full max-w-[800px] mx-auto mt-10 md:mt-20 p-4 md:p-6 bg-black bg-opacity-10 text-white rounded-xl shadow-md">
      <div className="bg-[#0A0A0A] md:p-8 px-4 rounded-md">

        <form onSubmit={handleSaveProfileWrapper} id="profile-form">
          <div className='px-4 mt-10'>
            <div className="p-4  md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white">
              <h2 className="text-3xl font-semibold m-5">
                {localError ? "Create Profile" : "Update Tutor Profile"}</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-[400px] aspect-square">
                  <ProfileImgUpload
                    onImageChange={handleImageChange}
                    defaultImage={formData.profilePicture}
                    onImageDeleted={() => setFormData(prev => ({ ...prev, profilePicture: '' }))}
                    userId={safeUserId}
                    disabled={!isEditing}
                  />
                </div>
                <div className="w-full space-y-4 md:mt-0 mt-2 ">
                  {renderInputField("fullName", "Full Name")}
                  {renderInputField("email", "Email", "text", true)}
                  {renderInputField("phone", "Phone")}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="bg-white bg-opacity-10 w-full rounded-sm p-2 text-white"
                  >
                    <option value="" className="bg-white bg-opacity-10 ">Select Gender</option>
                    <option value="male" className="bg-white bg-opacity-10 ">Male</option>
                    <option value="female" className="bg-white bg-opacity-10 ">Female</option>
                    <option value="other" className="bg-white bg-opacity-10 ">Other</option>
                  </select>
                </div>
                {renderInputField("dob", "Date of Birth", "date")}
                {[
                  "city",
                  "nationality",

                ].map((field) => (
                  <div key={field}>{renderInputField(field)}</div>
                ))}
              </div>
              <div>
                <CountryForm
                  value={formData.country}
                  onChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
                  disabled={!isEditing} />
              </div>

            </div>
          </div>
          <div className='px-4 mt-10'>
            <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
              <div className='flex'> <h3 className="text-xl  font-semibold mb-4">Professional Bio</h3>

              </div>
              <textarea
                id="professional_bio"
                value={formData.professional_bio || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className='h-[243px] w-full bg-white/10 p-3 '
                placeholder='Write a short bio about yourself' ></textarea>
            </div>
          </div>
          <div className='px-4 mt-10'>
            <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
              <h3 className="text-xl font-semibold mb-4">Education & Professional Details</h3>
              <div className="mt-10  pt-3">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
                  {["education_level"].map((field) => (
                    <div key={field}>{renderInputField(field)}</div>
                  ))}
                </div>
              </div>
              <div className="mt-10  pt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/50">
                  {["current_role", "industry"].map((field) => (
                    <div key={field}>{renderInputField(field)}</div>
                  ))}
                </div>
              </div>
              <div className="mt-10  pt-3">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
                  {["linkedin_profile", "years_of_experience", "skills"].map((field) => (
                    <div key={field}>{renderInputField(field, field === "years_of_experience" ? "Years of Experience" : field.replace("_", " "))}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className='pt-3 mt-10'>
              <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
                <div className='flex'>
                  <h3 className="text-xl flex-1 font-semibold mb-4 p-3">Certification</h3>
                  <button
                    type="button"
                    onClick={handleAddCertificationWrapper}
                    disabled={savingCertification || !formData.name_of_certificate}
                    className='md:flex flex-row-reverse justify-end hidden mb-4 p-3 bg-[#4318D1] disabled:opacity-50'>
                    {savingCertification ? "Adding..." : "Add Certificate"}
                  </button>
                </div>

                {/* Existing Certifications */}
                {loadingCertifications ? (
                  <div className="text-center py-4">Loading certifications...</div>
                ) : certifications.length > 0 ? (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-3">Your Certifications</h4>
                    <div className="space-y-3">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="bg-white/10 p-4 rounded-lg flex justify-between items-start">
                          <div className="flex-1 flex gap-4">
                            {/* Certificate Image */}
                            {cert.certificate_picture && (
                              <div className="flex-shrink-0">
                                <img
                                  src={cert.certificate_picture}
                                  alt={cert.name}
                                  className="w-20 h-20 object-cover rounded-md border border-white/20"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h5 className="font-medium text-white">{cert.name}</h5>
                              {cert.issuing_organization && (
                                <p className="text-white/70 text-sm">Issued by: {cert.issuing_organization}</p>
                              )}
                              {cert.date_obtained && (
                                <p className="text-white/70 text-sm">Date: {new Date(cert.date_obtained).toLocaleDateString()}</p>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteCertificationWrapper(cert.id)}
                            className="text-red-400 hover:text-red-300 text-sm px-2 py-1"
                            title="Delete certification"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-white/50">No certifications added yet.</div>
                )}

                {/* Add New Certification Form */}
                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-lg font-medium mb-3">Add New Certification</h4>
                  <div className="mt-10 pt-3">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
                      {["Name of Certificate"].map((field) => (
                        <div key={field}>{renderInputField(field)}</div>
                      ))}
                    </div>
                  </div>
                  <div className='mt-10 pt-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-white/50'>
                      {["Issuing Organizzation"].map((field) => (
                        <div key={field}>{renderInputField(field)}</div>
                      ))}
                      <div>{renderInputField("Date Obtained", "Date Obtained", "date")}</div>
                    </div>
                  </div>
                  <div className='mt-10 pt-3'>
                    <div className="flex flex-col items-center">
                      <label className="block text-sm font-medium mb-2 text-white/50">
                        Certificate Image
                      </label>
                      <CertificateImageUpload
                        onImageChange={handleCertificateImageChange}
                        defaultImage={formData.certificate_picture}
                        disabled={!isEditing}
                        uploadingImage={uploadingCertificateImage}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCertificationWrapper}
                    disabled={savingCertification || !formData.name_of_certificate}
                    className='flex justify-center md:hidden items-center mx-auto my-6 p-3 bg-[#4318D1] disabled:opacity-50'>
                    {savingCertification ? "Adding..." : "Add Certificate"}
                  </button>
                </div>

              </div>
            </div>
            <div className='pt-3 mt-10'>
              <div className='md:mx-auto w-full max-w-[800px] my-2 bg-white bg-opacity-[4%] border-white border-opacity-10 border-2 text-white p-4'>
                <div className='flex'> <h3 className="text-xl  font-semibold mb-4">Course Specialization</h3>
                  <button className='flex-1 justify-end hidden md:ml-28 mb-4 bg-[#4318D1]'>Add Certificate</button>
                </div>
                <div className="mt-10  pt-3">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-white/50">
                    {["Specialization", "Preferred Learner Level",].map((field) => (
                      <div key={field}>{renderInputField(field)}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className='mx-auto flex justify-center bg-[#4318D1] mt-10 py-2 px-10 disabled:opacity-50'>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
        <div className='flex flex-1 justify-center mx-auto mt-10'>
          {!isEditing ? (
    <button 
    className=' bg-[#4318D1] py-2 px-10 '
     onClick={handleEditClick}>Edit</button>
          ) : 
          <button 
          className=' bg-[#4318D1] py-2 px-10 '
          onClick={handleCancel}>Cancel</button>}

      </div>
      </div>
      {localError && <p className="text-red-500 mt-4 text-center justify-center items-center">{localError}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
    </div>
  )
}

export default TutorProfileCard
