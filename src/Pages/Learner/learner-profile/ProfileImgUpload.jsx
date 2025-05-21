import React from 'react';

const ProfileImgUpload = ({ imageUrl, onImageChange, disabled }) => {
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
    <div className="md:w-1/2 w-3/4 h-[250px] mx-auto md:mx-5 md:h-full flex flex-col items-center justify-center border-2 border-dashed border-white/50 rounded-md p-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover rounded-md"
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