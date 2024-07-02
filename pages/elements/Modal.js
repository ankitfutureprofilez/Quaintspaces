import React, { useEffect } from 'react';

function Modal({ isOpen, onClose, children, width }) {
  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (e) => {
      if (isOpen && e.target.classList.contains('modal-backdrop')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className=" absolute top-0 w-full min-h-full z-50 left-0 flex items-center justify-center p-2">
      <div className="modal-backdrop absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className={`modal-content bg-white  overflow-y-auto w-full rounded shadow-lg z-50 relative rounded-lg max-w-${width || 'lg'}`}>
        <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            
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
