import React from "react";

const Popup = ({ isOpen, setisOpen, text, togglePopup, space, btnclass, buttontext, footer, children }) => {
  return (
    <div className={`popup ${isOpen ? "active" : ""}`} onClick={() => setisOpen(false)}>
      <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-black bg-opacity-30">
        <div className="popup-content bg-white rounded-lg p-6 max-w-md">
          <div className="popup-header flex justify-between items-center border-b pb-3 mb-4">
            <h2>{text}</h2>
            <span className="close text-gray-400 hover:text-gray-600 cursor-pointer" onClick={togglePopup}>
              &times;
            </span>
          </div>
          <div className="popup-body">{children}</div>
          <div className="popup-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
