
import Button from "@/components/global/atoms/buttons/Button";
import { homeButtons } from "@/json/homeButtons.json";
import React from "react";

type AllHomeButtonsProps = {
  handleClick: (id: number) => void;
  moduleId: number | null;
};

const AllHomeButtons: React.FC<AllHomeButtonsProps> = (props) => {
  const {handleClick, moduleId} = props;
  return (
    <div className="flex items-center gap-2 mb-1 overflow-x-auto hide-scrollbar">
      {homeButtons.map((item, index) => (
        <React.Fragment key={index}>
          <Button
            variant="primary"
            onClick={()=> handleClick(item?.id)}
            className={`bg-white text-primary_bg_indigo border border-primary_bg_indigo rounded-none p-1 px-2 text-nowrap ${item?.id === moduleId && "bg-primary_bg_indigo text-white"}`}
          >
            {item.name}
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AllHomeButtons;
