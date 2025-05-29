import React, { useRef } from 'react';
import { supabase } from '../../../SupabaseFile'; // Adjust import to your actual Supabase client setup

const ProfileImgUpload = ({ defaultImage, onImageChange, disabled, userId, onImageDeleted }) => {
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

  const handleDeleteImage = async () => {
    try {
      if (!defaultImage || !userId) return;

      const fileName = defaultImage.split('/').pop();
      if (!fileName) return;

      const { error } = await supabase.storage
        .from('img-profile')
        .remove([`user_${userId}/${fileName}`]);

      if (error) {
        console.error('Error deleting image:', error.message);
        return;
      }

      if (onImageDeleted) onImageDeleted(); // Notify parent to clear formData.profilePicture

    } catch (err) {
      console.error('Unexpected error deleting image:', err);
    }
  };

  return (
    <div className="md:mx-5 h-[200px] w-[200px] mx-auto flex flex-col items-center justify-center border-2 border-dashed border-white/50 rounded-md relative">
      <div onClick={handleClick} className="cursor-pointer">
        {defaultImage ? (
          <img
            src={defaultImage}
            alt="Profile"
            className="w-[200px] h-[200px] object-cover rounded-md"
          />
        ) : (
          <p className="text-white/50 text-center">Upload Profile Picture</p>
        )}
      </div>

      {defaultImage && (
        <button
          type="button"
          onClick={handleDeleteImage}
          className="mt-2 text-xs text-red-500 underline"
        >
          Delete Image
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImgUpload;
