import React, { Fragment } from "react";
import { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsXLg } from "react-icons/bs";

interface modalProps {
  showModal: boolean;
  closeModal: () => void;
  children: ReactNode;
  titleName: string;
  sizeModal: string;
}

const RightSlideModal: React.FC<modalProps> = ({
  showModal,
  closeModal,
  children,
  titleName,
  sizeModal,
}) => {
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden ">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className={`pointer-events-auto relative w-screen max-w-xl`}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="bg-whiteb relative rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={closeModal}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <BsXLg className="rounded-full  bg-white p-1 text-2xl text-gray-500" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="fixed z-50 h-20 w-full bg-white px-4 sm:px-6">
                    <Dialog.Title className=" text-xl font-normal text-gray-700 pt-4">
                      {titleName}
                    </Dialog.Title>
                  
                  </div>
                  <div className="flex h-full flex-col gap-4 overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className=" relative mt-14 flex-1 px-4 sm:px-6">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RightSlideModal;
