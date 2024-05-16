// import { usePathname } from "next/navigation";
import React from "react";

type StepPorps = {
  className?: string;
  activeStep: number;
  handleClick: (step: number) => void;
};

const Steps: React.FC<StepPorps> = (props) => {
  // const pathname = usePathname();
  const { className, activeStep, handleClick } = props;
  const items = [
    {
      info: "VIEW DETAILS",
      isVisible: true,
    },
    {
      info: "VIEW DOCUMENTS",
      isVisible: true,
    },
    // {
    //   info: "VERIFY DOCUMENTS",
    //   isVisible: !pathname.includes('outbox'),
    // },
    // {
    //   info: "ACTION",
    //   isVisible: !pathname.includes('outbox'),
    // },
  ];

  return (
    <>
      <div className={`flex ${className}`}>
        {items.map((item, index) => (
          <div
            onClick={() => handleClick(index)}
            key={index}
            className={`mr-4 flex-col items-center cursor-pointer ${!item?.isVisible && "hidden"}`}
          >
            <span className="text-black">{item.info}</span>
            <div
              className={`h-2 w-4 ml-[40%] border-l-[10px] border-l-transparent border-b-[10px] border-b-indigo-500 border-r-[10px] border-r-transparent ${index !== activeStep && "hidden"}`}
            ></div>
          </div>
        ))}
      </div>
      <hr className="border-2 border-indigo-500" />
    </>
  );
};

export default Steps;
