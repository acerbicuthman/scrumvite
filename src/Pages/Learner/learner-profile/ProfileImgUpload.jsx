import React from 'react';


const ProfileImgUpload = ({ defaultImage, onImageChange, disabled }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    } else {
      console.error('Invalid file: Please select an image');
      // Optionally, show a UI error (requires state or callback)
    }
  };

  return (
    <div className="  md:mx-5 md:h-full flex flex-col items-center justify-center border-2 border-dashed border-white/50 rounded-md ">
      {defaultImage ? (
        <img
          src={defaultImage}
          alt="Profile"
          className="w-full h-full object-contain -mb-20 md:-mb-20 rounded-md"
        />
      ) : (
        <p className="text-white/50">Upload Profile Picture</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="mt-2 text-white"
      />
    </div>
  );
};

export default ProfileImgUpload;