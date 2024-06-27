import React from 'react';

function Modal({ isOpen, onClose, children, width }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className={`bg-white max-h-[90vh] overflow-y-auto w-full rounded shadow-lg z-50 relative rounded-lg max-w-${width || 'lg'}`}>
        <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}



export default Modal;
