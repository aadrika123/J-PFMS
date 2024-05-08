"use client";
import Image from "next/image";
import React from "react";

type item = {
  label?: string;
  img?: any;
  info?: string;
};

type StepperProps = {
  items: item[];
  activeStepper: number;
  activeBgColor?: string;
  inActiveBgColor?: string;
  stepWidth?: 36 | 32 | 48;
};

const Stepper: React.FC<StepperProps> = (props) => {
  const {
    items,
    activeStepper,
    activeBgColor = "primary_bg_indigo",
  } = props;
  return (
    <div className="flex ml-10">
      {items.map((item, index) => (
        <div key={index} className={`w-full`}>
          <div className={`flex items-center`}>
            <div
              className={`h-8 w-10 rounded-full flex items-center justify-center p-1 text-white ${activeStepper >= index + 1 ? `bg-${activeBgColor}` : `bg-gray-500`}`}
            >
              {activeStepper === index + 1 &&
                (item?.label || <Image src={item.img} alt="" />)}
            </div>

            <hr
              className={`w-full border-2 ${items.length === index + 1 && "opacity-0"} ${activeStepper >= index + 1 && `border-${activeBgColor}`}`}
            />
          </div>
          <div
            className={`mr-6 mt-3 -ml-10 w-28 text-xs text-center ${activeStepper >= index + 1 && "font-bold"}`}
          >
            {item.info}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;

// <div className="flex ml-10 flex-col">
//   <div className="flex">
//     {items.map((item, index) => (
//       <div key={index} className={`w-full`}>
//         <div className={`flex items-center`}>
//           <div
//             className={`h-8 w-10 rounded-full flex items-center justify-center p-1 text-white ${activeStepper >= index + 1 ? `bg-${activeBgColor}` : `bg-gray-500`}`}
//           >
//             {activeStepper === index + 1 &&
//               (item?.label || <Image src={item.img} alt="" />)}
//           </div>

//           <hr
//             className={`w-full border-2 ${items.length === index + 1 && "opacity-0"} ${activeStepper >= index + 1 && `border-${activeBgColor}`}`}
//           />
//         </div>
//       </div>
//     ))}
//   </div>
//   <div className="flex">
//     {items.map((item, index) => (
//       <div
//         key={index}
//         className={`mr-6 mt-3 w-30 text-xs text-center ${activeStepper >= index + 1 && "font-bold"}`}
//       >
//         {item.info}
//       </div>
//     ))}
//   </div>
// </div>
