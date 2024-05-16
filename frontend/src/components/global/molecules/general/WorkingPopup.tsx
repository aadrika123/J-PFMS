import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { DNA } from "react-loader-spinner";


const WorkingPopup: React.FC = () => {
  const delay = 500;
  const [step, setStep] = useState<number>(0);


  useEffect(() => {

    const delayInputTimeoutId = setTimeout(() => {

      setStep(step > 2 ? 0 : step + 1);
    }, delay);
    return () => clearTimeout(delayInputTimeoutId);
  });

  

  return (
    <Popup title="" zindex={50} width={40}>
      <div className="flex flex-col justify-center items-center w-40">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <span className="text-[20px] text-black my-8">Working {".".repeat(step)}</span>
      </div>
    </Popup>
  );
};

export default WorkingPopup;
