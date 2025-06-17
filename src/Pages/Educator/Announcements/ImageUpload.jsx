import React, { useRef, useState } from 'react';
import uploadImg from '../../../assets/uploadImage.png';

const ImageUploader = ({ imageFile, setImageFile }) => {
    const fileInputRef = useRef(null);
  
    const handleImageClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        setImageFile(file);
      }
    };
  
    return (
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <img
          src={uploadImg}
          alt="Upload"
          onClick={handleImageClick}
          className="cursor-pointer w-24 h-24 object-contain"
        />
        {imageFile && (
          <div className="mt-2">
            <p className="text-sm text-white/50">Preview:</p>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="max-h-40 object-contain rounded-md"
            />
          </div>
        )}
      </div>
  );
};

export default ImageUploader;
