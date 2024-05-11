import React from "react";
import Button from "../atoms/buttons/Button";
import Popup from "./general/Popup";

interface ConfirmationPopupProps {
  cancel: () => void;
  continue: (data?: any) => void;
  message?: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = (props) => {
  const handleContinueButton = (data?: any) => {
    props.continue(data);
    props.cancel();
  };
  return (
    <Popup title="" zindex={50}>
      <div className="flex flex-col justify-center items-center w-auto">
        <svg
          width="191"
          height="191"
          viewBox="0 0 191 191"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="animate-pulse"
        >
          <rect width="191" height="191" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_19_813" transform="scale(0.0052356)" />
            </pattern>
            <image
              id="image0_19_813"
              width="191"
              height="191"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
        <span className="text-[20px] text-black my-8">
          {props.message
            ? props.message
            : "Are you sure you want to add proposal?"}
        </span>
        <div className="flex items-center">
          <Button className="mr-2" onClick={props.cancel} variant="cancel">
            Cancel
          </Button>
          <Button onClick={handleContinueButton} variant="primary">
            Yes
          </Button>
        </div>
        {/* <div className="flex items-center mt-2">
          <span className="text-[#F00] mr-1">*</span>
          <span className="text-[11px] text-black">{props.message}</span>
        </div> */}
      </div>
    </Popup>
  );
};

export default ConfirmationPopup;
