import Image from "next/image";
import React from "react";
import home from "@/assets/svg/list.svg";
import { DateFormatter } from "@/utils/helper";
import { Paragraph } from "@/components/global/atoms/Paragraph";
import Title from "./Title";
import moment from "moment";

type SpanProps = {
  label?: string;
  content?: string;
  className?: string;
};

type BoxContainerPropsType<T> = {
  projectDetails: T;
};

/////////// BoldSpan Component
export const BoldSpan: React.FC<SpanProps> = (props) => {
  const { label, content, className } = props;
  return (
    <span className={`mb-2 text-secondary ${className} `}>
      {label && <b>{label}&nbsp;</b>}
      {Array.isArray(content) ? content.map((i) => i.ward_name).join(',') : content}
    </span>
  );
};

const BoxContainer: React.FC<BoxContainerPropsType<any>> = (props) => {
  const { projectDetails } = props;

  return (
    <div className="flex items-center gap-2 mt-4">
      <div className="bg-gray-100 border flex flex-col p-4 h-52 w-1/3 items-center justify-center rounded">
        <BoldSpan
          className="text-secondary_black mb-4 text-center"
          label={projectDetails?.project_proposal_no}
        />
        <BoldSpan label={DateFormatter(projectDetails?.proposed_date)} />
        <BoldSpan content="Proposal Date" />
        <div className="flex items-center mb-2">
          <Image src={home} alt="calender" />
          <span className="ml-1 text-red-500">
            {`${projectDetails?.proposed_date.split("T")[0] == new Date().toISOString().split("T")[0] ? "Today" : moment(projectDetails?.proposed_date).fromNow()}`}
          </span>
        </div>
      </div>
      <div className="bg-gray-100 border flex flex-col py-4 px-8 h-52 w-full rounded">
        <section>
          <Title title="Project Description" />
          <Paragraph desc={projectDetails?.description} />
        </section>
      </div>
    </div>
  );
};

export default BoxContainer;
