import React, { useState } from 'react';

const ImageUploadPreview = ({ currentImageUrl, onFileSelect, label = 'Upload Image', accept = 'image/*' }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const displayUrl = previewUrl || currentImageUrl;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-4">
        {displayUrl && (
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#cea605]/30 shrink-0 bg-black/50">
            <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <label className="flex-1 border border-dashed border-white/20 hover:border-[#cea605]/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
          <span className="text-xs text-gray-400">Click or drag file to upload</span>
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ImageUploadPreview;
