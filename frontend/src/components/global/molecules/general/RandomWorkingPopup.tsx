'use client'
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
// import { BallTriangle, Circles, ColorRing, DNA, ProgressBar, RotatingLines, Watch} from 'react-loader-spinner'
// import { useDailyRandomNumber } from "./useRandomNumber";


interface RandomWorkingPopupProps {
  show: boolean
}

// const spinnerProps = {
//   visible: true,
//   height: "160",
//   width: "160",
//   ariaLabel: "loading",
//   wrapperStyle: {},
//   wrapperClass: "dna-wrapper",
//   color: "#4338ca"
// };

const RandomWorkingPopup: React.FC<RandomWorkingPopupProps> = ({show}: RandomWorkingPopupProps) => {
  const delay = 500;
  const dotCount = 3;
  const [step, setStep] = useState<number>(0);

  
  useEffect(() => {
    
    const delayInputTimeoutId = setTimeout(() => {
    
      setStep(step < dotCount ? step + 1:0); 
    }, delay);
    return () => clearTimeout(delayInputTimeoutId);
  });



  // const spinners = [DNA, BallTriangle, ColorRing, Watch, ProgressBar, RotatingLines, Circles];
  // const spinnerID = useDailyRandomNumber("RandomworkingPopup", spinners.length);
  // const spinner = spinners[spinnerID](spinnerProps);
  
  return (

    <>
      {show && (
        <Popup title="" zindex={50} width={80}>
          <div className="flex flex-col justify-center items-center w-40">
            {/* {spinner} */}
            <span className="text-[20px] text-black my-8">Working {".".repeat(step).padEnd(dotCount, "\u00A0")}</span>
          </div>
        </Popup>
      )}
    </>
  );
};

export default RandomWorkingPopup;
