"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    <section>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="abstract-content"
          id="abstract-center"
          className="bg-indigo-700 text-white text-center"
          style={{
            width: "100%",
            height: "50px",
          }}
        >
          <div className="flex justify-between">
            <ExpandMoreIcon />
            <h2 className="text-xl font-semibold ">Running Bills</h2>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p>{projectDesc}</p>
          <hr className="my-4 border-gray-400" />
          <div className=" flex justify-between gap-4">
            {proposalDetails.map((detail, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-bold">{detail.label}:</span>
                <span>{detail.content}</span>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </section>
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
