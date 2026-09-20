import React from 'react';

const ConfirmModal = ({ isOpen, title = 'Confirm Action', message = 'Are you sure you want to proceed?', onConfirm, onCancel, confirmText = 'Delete', isDanger = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111111] border border-[#cea605]/30 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                : 'bg-[#cea605] hover:bg-[#f2de8c] text-black shadow-lg shadow-[#cea605]/30'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
