import React, { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Popup({
  children,
  space,
  btnclass,
  buttontext,
  togglePopup,
  isOpen,
  setisOpen,
  text,
  footer,
}) {
  const cancelButtonRef = useRef(null);

  const closePopup = () => {
    togglePopup(!isOpen);
    setisOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    // console.log("Clicked on", menuItem);
  };

  return (
    <>
      <button className={btnclass} onClick={closePopup}>
        {buttontext || ""}
      </button>

      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closePopup}
          initialFocus={cancelButtonRef}
        >
          <div className="flex justify-center items-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative bg-white rounded-lg p-6 max-w-md mx-auto">
                <button
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={closePopup}
                  ref={cancelButtonRef}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Dialog.Title className="text-lg font-bold">{text}</Dialog.Title>
                <div className={`mt-${space || 4}`}>
                  <ul className="space-y-2">
                    <li onClick={() => handleMenuItemClick("Details")}>
                      <button className="w-full text-left hover:bg-gray-100 p-2 rounded-md">
                        Details
                      </button>
                    </li>
                    <li onClick={() => handleMenuItemClick("Payment")}>
                      <button className="w-full text-left hover:bg-gray-100 p-2 rounded-md">
                        Payment
                      </button>
                    </li>
                    <li onClick={() => handleMenuItemClick("Booking")}>
                      <button className="w-full text-left hover:bg-gray-100 p-2 rounded-md">
                        Booking
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="mt-4">{children}</div>
                <div className="mt-4 flex justify-end">{footer}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}