//////////////////////////////////////////////////////////////////////////////////////
//    Author - Rahul Kumar
//    Version - 1.0
//    Date - 27/05/23
//    Revision - 1
//    Project - JUIDCO
//    Component  - ImageModal
//    DESCRIPTION - ImageModal
//////////////////////////////////////////////////////////////////////////////////////
"use client"
import React from "react";
// import cancel from "@/Components/assets/user copy.png";

interface ImageModalProps {
  imageModal: boolean;
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  preview: string;
}

const ImageModal: React.FC<ImageModalProps> = (props) => {
  const handleCancelClick = () => {
    props?.setImageModal(false);
    // navigate(`/add-pre-procurement`);
    // window.location.reload();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
          props.imageModal ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[1000]`}
      >
        <div
          className={`bg-white w-1/3 rounded-lg p-8 shadow-lg relative transform transition-transform ${
            props.imageModal ? "scale-100 modal-pop" : "scale-95"
          }`}
        >
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-blue-700"
            onClick={handleCancelClick}
          >
            <p className="text-3xl pr-3">&times;</p>
          </button>
          <img
            className="max-w-full mt-5 animate-wiggle mb-5"
            src={props?.preview}
            alt="alt title"
          />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
