"use client";
import React from "react";

interface ProposalDetail {
  label: string;
  content: string;
}

const proposalDetails: ProposalDetail[] = [
  {
    label: "To Page",
    content: "Back Officee",
  },
  {
    label: "Checked By",
    content: "JE enginner",
  },
  {
    label: "Checked Date",
    content: "25/05/25",
  },
  {
    label: "Measurement Book No",
    content: "50BNS56",
  },
  {
    label: "From Page ",
    content: "Executive enginner",
  },
  {
    label: "Remarks",
    content: "All are fine",
  },

];

const projectDesc =
  "Junior Engineer.";
const date = "25/05/24";
const date1 = "";

const DetailsCards: React.FC = () => {
     const firstFiveDetails = proposalDetails.slice(0, 5);
     const remainingDetails = proposalDetails.slice(5);

  return (
    <div className="border w-full mt-0 border-gray-300 bg-gray-100 rounded-lg p-6 shadow-md">
      <section>
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Person Recording the measurement{" "}
          </h2>
          <h2 className="text-xl font-semibold mb-4">Record Date </h2>

          <b className="text-indigo-700">MB Bill of Record No</b>
        </div>
        <div className="flex justify-between gap-4">
          <p>{projectDesc}</p>
          <p>{date}</p>
          <p>{date1}</p>
        </div>
      </section>
      <hr className="my-4 border-gray-400" />
      <div className="flex justify-between gap-4">
        {firstFiveDetails.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-bold">{detail.label}:</span>
            <span>{detail.content}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {remainingDetails.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-bold">{detail.label}:</span>
            <span>{detail.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MBRecordBill: React.FC = () => {
  return (
    <div className=" mx-auto mt-0 p-4">
      <DetailsCards />
    </div>
  );
};

export default MBRecordBill;
