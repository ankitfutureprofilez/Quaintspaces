
import React, { useEffect } from 'react';

function Modal({ isOpen, onClose, children, width }) {
  useEffect(() => {
    // Handle disabling and enabling page scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Clean up when the component is unmounted or when isOpen changes
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
    <div className="fixed top-0 w-full z-50 left-0 p-2 max-h-[100vh] h-full overflow-y-auto bg-[#1f293780]">
      <div className={`modal-dialog max-w-${width || 'lg'}`}>
        <div className={`modal-content overflow-hidden mx-auto bg-white w-full rounded shadow-lg z-50 relative rounded-lg`}>
          <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 z-[10]">
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
    </div>
  );
}

export default Modal;
