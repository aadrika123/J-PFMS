//////////////////////////////////////////////////////////////////////////////////////
//    Author - Rahul Kumar
//    Version - 1.0
//    Date - 28/05/24
//    Project - PFMS
//    Component  - PdfModal
//    DESCRIPTION - PdfModal
//////////////////////////////////////////////////////////////////////////////////////
"use client";
import React from "react";
// import pdfIcon from "../../../../../assets/icons/pdf.png";
// import Image from "next/image";

interface PdfModalProps {
  pdfModal: boolean;
  setPdfModal: React.Dispatch<React.SetStateAction<boolean>>;
  preview: string;
}

const PdfModal: React.FC<PdfModalProps> = (props) => {
  const handleCancelClick = () => {
    props?.setPdfModal(false);
  };

  const handlePdfClick = () => {
    window.open(props.preview, "_blank");
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
          props.pdfModal ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[1000]`}
      >
        <div
          className={`bg-white rounded-lg p-8 shadow-lg relative transform transition-transform ${
            props.pdfModal ? "scale-100 modal-pop" : "scale-95"
          }`}
        >
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-blue-700"
            onClick={handleCancelClick}
          >
            <p className="text-3xl pr-3">&times;</p>
          </button>
          {props.preview && props.preview.includes("pdf") ? (
            <div
              className="cursor-pointer h-full w-full"
              onClick={handlePdfClick}
            >
              <iframe
                src={props.preview} // Your PDF icon source
                // alt="PDF Preview"
                // height={400}
                // width={400}
                style={{ height: "500px", width: "600px" }}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          ) : (
            <img
              className="max-w-full mt-5 animate-wiggle mb-5"
              src={props.preview}
              alt="alt title"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PdfModal;
