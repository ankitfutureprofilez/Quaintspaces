import React, { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Popup({
  children,
  space,
  btnclass,
  buttontext,
  togglePopup,
  isOpen = false,
  text,
  footer,
}) {

  console.log('isOpen', isOpen)

  const cancelButtonRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [openPop,setOpenpop] = useState(isOpen || false);
  useEffect(() => {
    setOpenpop(isOpen);
  }, [isOpen]);

  const closep = () => { 
    setOpenpop(false)
    // togglePopup && togglePopup(!isOpen);
  }

  return isClient ? (
    <>
      <button className={btnclass} onClick={closep}>
        {buttontext || "Open"}
      </button>

      <Transition.Root show={openPop} as={Fragment}>
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
              <div className="relative bg-transparent bg-opacity-0 rounded-lg p-6 max-w-md mx-auto">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={closep}
                    ref={cancelButtonRef}
                  >
                    &times;
                  </button>
                <Dialog.Title className="text-lg font-bold">
                  {text}
                </Dialog.Title>
                <div className={`mt-${space || 4}`}>{children}</div>
                <div className="mt-4 flex justify-end">
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  ) : null;
}
