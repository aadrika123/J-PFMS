"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Icons } from "@/assets/svg/icons";

type item = {
  label?: string;
  img?: any;
  info?: string;
  others?: item[];
};

type ProjectProposalApprovalStepperProps = {
  items: item[];
  activeBgColor?: string;
  inActiveBgColor?: string;
  stepWidth?: 36 | 32 | 48;
  level: number;
  subLevel?: number;
  budget?: number;
};

const ProjectProposalApprovalStepper: React.FC<ProjectProposalApprovalStepperProps> = (props) => {
  const {
    items,
    activeBgColor = "primary_bg_indigo",
    level,
    subLevel = 0,
    budget = 0,
  } = props;
  const [state, setState] = useState({
    data: items,
    updatedSubLevel: subLevel,
    newLevel: level,
  });
  const { data, updatedSubLevel, newLevel } = state;

  ////// handle for showing timeline
  const handleTimeline = (internalLevel: number, isClicked: boolean) => {
    if (internalLevel > 0 && internalLevel < items.length) {
      const newList = [];
      const d1 = items.slice(0, internalLevel);
      const d2 = items[internalLevel];
      const d3 = items.slice(internalLevel + 1, items.length);

      newList.push(...d1);
      if (d2.others) {
        newList.push(
          ...d2.others.filter((i: any) => i.approvalAmount <= budget)
        );
      } else {
        newList.push(d2);
      }
      newList.push(...d3);
      setState({
        ...state,
        data: newList,
        updatedSubLevel: isClicked && updatedSubLevel !== 0 ? 0 : subLevel,
        newLevel: isClicked && newLevel === level ? level + (level - 1) : level,
      });
    } else {
      setState({
        ...state,
        data: items,
        updatedSubLevel: isClicked && updatedSubLevel !== 0 ? 0 : subLevel,
        newLevel: isClicked && newLevel === level ? level + (level - 1) : level,
      });
    }
  };

  useEffect(() => {
    handleTimeline(level, false);
  }, [level, budget, subLevel]);

  //// HandleClick
  const handleExpand = (item: any) => {
    if (item?.others?.length) handleTimeline(item.level, true);
  };

  return (
    <div className="flex ">
      {data.map((item: any, index) => (
        <div key={index} className={`w-full `}>
          <div
            className={`flex items-center ${item.level === undefined && "border-t-2 border-b-2 border-dashed"}`}
          >
            <hr
              className={`w-full border-2 ${index == 0 && "opacity-0"} ${newLevel + updatedSubLevel >= index && `border-${activeBgColor}`}`}
            />
            <div
              className={`h-9 w-20 rounded-full flex items-center justify-center p-1 text-white 
              ${item.level !== undefined && "mt-1"}
              ${newLevel + updatedSubLevel === index && `animate-pulse`} 
              ${item.others && item.others.length >0 && 'animate-pulse cursor-col-resize'}
              ${newLevel + updatedSubLevel >= index ? `bg-${activeBgColor}` : `bg-gray-500`}`}
              onClick={() => handleExpand(item)}
            >
              {newLevel + updatedSubLevel === index
                ? item?.label || (
                    <Image
                      className={` ${newLevel + updatedSubLevel === index && `animate-ping`}`}
                      src={item?.img}
                      alt=""
                    />
                  )
                : newLevel + updatedSubLevel >= index && Icons.done}
            </div>
            <hr
              className={`w-full border-2 ${data.length === index + 1 && "opacity-0"} ${newLevel + updatedSubLevel > index && `border-${activeBgColor}`}`}
            />
          </div>
          <div
            className={`mt-3 text-xs text-center ${newLevel + updatedSubLevel >= index && "font-bold"}`}
          >
            {item?.info}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectProposalApprovalStepper;