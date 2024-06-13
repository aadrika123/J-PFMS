//////////////////////////////////////////////////////////////////////////////////////
//    Author - Rahul Kumar
//    Version - 1.0
//    Date - 27/05/23
//    Revision - 1
//    Project - JUIDCO
//    Component  - MeasurmentModal
//    DESCRIPTION - MeasurmentModal
//////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { AddMeasurementComponent } from "./AddMeasurementComponent";
// import AddMeasurementModal from "./AddMeasurementModal";
// import AddMeasurementComponent from "./E_Measurement";
// import cancel from "@/Components/assets/user copy.png";

interface MeasurmentModalProps {
  measModal: boolean;
  setMeasModal: (value: boolean) => void;
  // setMeasModal: React.Dispatch<React.SetStateAction<boolean>>;
  // preview: string;
}

const MeasurmentModal: React.FC<MeasurmentModalProps> = (props) => {
  const handleCancelClick = () => {
    props?.setMeasModal(false);
    // navigate(`/add-pre-procurement`);
    // window.location.reload();
  };
  // measModal;
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
          props.measModal ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[1000]`}
      >
        <div
          className={`bg-white  px-10 pb-48 pt-8 rounded-lg m shadow-lg relative transform transition-transform ${
            props.measModal ? "scale-100 modal-pop" : "scale-95"
          }`}
        >
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-blue-700"
            onClick={handleCancelClick}
          >
            <p className="text-3xl pr-3">&times;</p>
          </button>
          <AddMeasurementComponent
            measurementModal={true}
            setMeasurementModal={props.setMeasModal}
          />
        </div>
      </div>
    </>
  );
};

export default MeasurmentModal;
