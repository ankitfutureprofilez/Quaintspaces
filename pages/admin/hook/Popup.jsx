import React from "react";

const Popup = ({
  isOpen,
  setisOpen,
  text,
  togglePopup,
  space,
  btnclass,
  buttontext,
  footer,
  children,
}) => {
  return (
    <div className="fixed inset-50 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white px-8  rounded shadow-lg z-50 relative rounded-lg max-w-[33%]">
        <div
          className={`popup ${isOpen ? "active" : ""}`}
          onClick={() => setisOpen(false)}
        >
          <div className="popup-content bg-white rounded-lg p-6 max-w-md">
            <div className="popup-header flex justify-between items-center  pb-3 mb-4">
              <h2>{text}</h2>
              <span
                className="close text-gray-400 hover:text-gray-600 cursor-pointer "
                onClick={togglePopup}
              >
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" fill="white" />
                  <path
                    d="M7 17L16.8995 7.10051"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 7.00001L16.8995 16.8995"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div className="popup-body">{children}</div>
            <div className="popup-footer">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
