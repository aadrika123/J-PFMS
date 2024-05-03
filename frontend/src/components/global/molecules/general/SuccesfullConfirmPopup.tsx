import React from "react";
import Popup from "./Popup";


interface SuccesfullConfirmPopupProps {
  message: string;
}

const SuccesfullConfirmPopup: React.FC<SuccesfullConfirmPopupProps> = (props) => {
  const { message } = props;
  return (

    <Popup title="" zindex={50}>
      <div className="flex flex-col justify-center items-center w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="191"
          height="191"
          viewBox="0 0 191 191"
          fill="none"
        >
          <path
            d="M95.5 0C42.8386 0 0 42.8386 0 95.5C0 148.161 42.8386 191 95.5 191C148.161 191 191 148.161 191 95.5C191 42.8386 148.161 0 95.5 0ZM152.8 64.1214C152.8 64.1214 102.867 119.239 91.68 132.336C80.4929 145.433 71.7614 132.336 71.7614 132.336L39.2914 98.7743C39.2914 98.7743 34.1071 90.8614 43.3843 83.4943C52.1157 76.4 59.21 83.4943 59.21 83.4943L82.13 107.506L139.157 54.2986C139.157 54.2986 144.614 50.4786 150.344 55.39C154.71 59.4829 152.8 64.1214 152.8 64.1214Z"
            fill="#12743B"
          />
        </svg>
        <span className="text-[20px] text-black my-8">{message}</span>
      </div>
    </Popup>
  );
};

export default SuccesfullConfirmPopup;
