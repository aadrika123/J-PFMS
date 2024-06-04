"use client";
import React from "react";

interface ProposalDetail {
  label: string;
  content: string;
}

const proposalDetails: ProposalDetail[] = [
  {
    label: "S.No",
    content: "1",
  },
  {
    label: "Quantity",
    content: "1",
  },
  {
    label: "Unit",
    content: "1km",
  },
  {
    label: "Rate(Rs)",
    content: "500000",
  },
  {
    label: "Cost(Rs)",
    content: "2000000",
  },
  {
    label: "SOR Year",
    content: "2024",
  },

  {
    label: "Remarks/Input Ref",
    content: "All are fine",
  },
];

const projectDesc =
  "This is a dummy Measurement Description  for the frontend-only version.";

const DetailsCards: React.FC = () => {
  return (
    <div className="border w-full mt-0 border-gray-300 bg-gray-100 rounded-lg p-6 shadow-md">
      <section>
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Measurement Description{" "}
          </h2>
          <b className="text-indigo-700">Measurement</b>
        </div>
        <p>{projectDesc}</p>
      </section>
      <hr className="my-4 border-gray-400" />
      <div className=" flex justify-between gap-4">
        {proposalDetails.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-bold">{detail.label}:</span>
            <span>{detail.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardDetails: React.FC = () => {
  return (
    <div className=" mx-auto mt-0 p-4">
      <DetailsCards />
    </div>
  );
};

export default CardDetails;
