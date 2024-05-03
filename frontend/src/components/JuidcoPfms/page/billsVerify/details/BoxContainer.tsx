import Image from "next/image";
import React from "react";
import home from "@/assets/svg/list.svg";
import { DateFormatter } from "@/utils/helper";

type SpanProps = {
  label?: string;
  content?: string;
  className?: string;
};

type BoxContainerPropsType= {
  billDetails: any;
}

/////////// BoldSpan Component
export const BoldSpan: React.FC<SpanProps> = (props) => {
  const { label, content, className } = props;
  return (
    <span className={`mb-2 text-secondary ${className} `}>
      {label && <b>{label}&nbsp;</b>}
      {content}
    </span>
  );
};

const BoxContainer:React.FC<BoxContainerPropsType> = (props) => {
  const {billDetails} = props;
  return (
    <div className="flex items-center gap-2 mt-4">
      <div className="bg-gray-100 border flex flex-col p-4 h-52 w-1/3 items-center justify-center rounded">
        <BoldSpan className="text-secondary_black mb-4" label={billDetails?.bill_no} />
        <BoldSpan label={DateFormatter(billDetails?.bill_date)} />
        <BoldSpan content="Bill Date" />
        <div className="flex items-center mb-2">
          <Image src={home} alt="calender" />
          <BoldSpan
            className="mt-2 ml-1 text-red-700"
            content="13 days passed"
          />
        </div>
      </div>
      <div className="bg-gray-100 border flex flex-col py-4 px-8 items-center justify-center h-52 w-full rounded">
        <div className="flex items-center mb-2">
          <Image src={home} alt="calender" />
          <BoldSpan
            className="mt-2 ml-1 text-secondary_black"
            label="Bill Details"
          />
        </div>

        <div className="flex justify-between w-full">
          <div className="flex flex-col w-2/4">
            <BoldSpan label="Bill No:" content={billDetails?.bill_no} />
            <BoldSpan label="ULB Name:" content={billDetails?.ulb?.ulbs} />
            <BoldSpan label="Bill Date:" content={DateFormatter(billDetails?.bill_date)} />
          </div>
          <div className="flex flex-col">
            <BoldSpan label="Name Of Pary:" content={billDetails?.party?.name} />
            <BoldSpan label="Bill Amount:" content={billDetails?.amount} />
            <BoldSpan label="Remarks:" content={billDetails?.remarks} />
          </div>
        </div>
        <BoldSpan className="mt-2 text-indigo-500" label="View Full Details" />
      </div>
    </div>
  );
};

export default BoxContainer;
