import Button from "@/components/global/atoms/buttons/Button";
import Popup from "@/components/global/molecules/general/Popup";
import React, { ReactNode } from "react";

interface ConfirmationPopupWithInputProps {
  cancel: () => void;
  continue: (data?: any) => void;
  message: string;
  inputComment?: ReactNode;
}

const ConfirmationPopupWithInput: React.FC<ConfirmationPopupWithInputProps> = (
  props
) => {
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
          viewBox="0 0 175 175"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="87.6773" cy="87.6631" r="86.8785" fill="#4338CA" />
          <rect
            x="47.1934"
            y="47.1802"
            width="81.875"
            height="81.875"
            fill="url(#pattern0_1268_587)"
          />
          <defs>
            <pattern
              id="pattern0_1268_587"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_1268_587" transform="scale(0.0111111)" />
            </pattern>
            <image
              id="image0_1268_587"
              width="90"
              height="90"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
        <div className="mt-2">{props.inputComment}</div>
        <span className="text-[20px] text-black my-2">{props.message}</span>
        <div className="flex items-center">
          <Button className="mr-2" onClick={props.cancel} variant="cancel">
            Cancel
          </Button>
          <Button onClick={handleContinueButton} variant="primary">
            Continue
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

export default ConfirmationPopupWithInput;
