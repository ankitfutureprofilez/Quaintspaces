import React, { Fragment, useRef, useEffect, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Popup({
  children,
  space,
  btnclass,
  buttontext,
  togglePopup,
  isOpen ,
  setisOpen,
  text,
  footer,
}) {

  const cancelButtonRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

//   const [openPop, setOpenpop] = useState(isOpen || false);
//   useEffect(() => {
//     setOpenpop(isOpen);
//   }, [isOpen]);

  const closep = () => {
    togglePopup (isOpen);
    // setisOpen(false);
  };

  return isClient ? (
    <>
      <button className={btnclass} onClick={closep}>
        {buttontext || ""}
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closep}
          initialFocus={cancelButtonRef}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="relative bg-transparent bg-opacity-0 rounded-lg p-6 max-w-md mx-auto">
                <button
                  className="px-4 py-2 popup-button absolute text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={closep}
                  ref={cancelButtonRef}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Dialog.Title className="text-lg font-bold">
                  {text || "hello"}
                </Dialog.Title>
                <div className={`mt-${space || 4}`}>{children}</div>
                <div className="mt-4 flex justify-end"></div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  ) : null;
}
