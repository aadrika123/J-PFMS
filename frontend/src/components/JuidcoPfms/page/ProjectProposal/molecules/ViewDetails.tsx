import React from "react";
import { BoldSpan } from "./BoxContainer";
import Title from "./Title";
import { Paragraph } from "@/components/global/atoms/Paragraph";

type DetailsCardsProps<T> = {
  title: string;
  proposalDetails: T[];
  projectDesc:string;
};

type ViewDetailsProps<T> = {
  projectDetails: T;
};

export const DetailsCards: React.FC<DetailsCardsProps<any>> = (props) => {
  const { proposalDetails, projectDesc } = props;
  return (
    <>
      <div className="border p-6 mt-4">
        <section>
          <Title title="Project Description" />
          <Paragraph
            desc={projectDesc}
          />
        </section>
        <hr className="mt-3 border border-gray-400" />
        <hr className="border border-gray-400" />
        <div className=" grid grid-cols-4 gap-4 mt-3">
          {proposalDetails.map((vendor, index) => (
            <React.Fragment key={index}>
              <BoldSpan
                className="flex flex-col"
                label={vendor?.label}
                content={vendor?.content}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

const ViewDetails: React.FC<ViewDetailsProps<any>> = (props) => {
  const { projectDetails } = props;
  const proposalDetails = [
    {
      label: "State",
      content: projectDetails?.state_name,
    },
    {
      label: "Execution Body",
      content: projectDetails?.execution_body_name,
    },
    {
      label: "ULB Name",
      content: projectDetails?.ulb_name,
    },
    {
      label: "Pin Code",
      content: projectDetails?.pin_code,
    },
    {
      label: "Ward No",
      content: projectDetails?.ward_name,
    },
    {
      label: "Address",
      content: projectDetails?.address,
    },
  ];

  return (
    <>
      <DetailsCards
        title="Project Description"
        proposalDetails={proposalDetails}
        projectDesc={projectDetails?.description}
      />
    </>
  );
};

export default ViewDetails;
