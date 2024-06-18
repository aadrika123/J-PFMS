"use client";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { number } from "yup";
// import { indigo } from "@mui/material/colors";
interface ProposalDetail {
  label: string;
  content: string;
}
interface ProposalDetail1 {
  label: string;
  content: string;
}
const proposalDetails1: ProposalDetail1[] = [
  {
    label: "S.No",
    content: "1",
  },
  {
    label: "Description",
    content: "This is a dummy Abstract of Estimated Cost  for the frontend-only version.",

  },
];
const proposalDetails: ProposalDetail[] = [
  {
    label: "No",
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

// const projectDesc =

const DetailsCards: React.FC = () => {
  return (
    <section>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="abstract-content"
          id="abstract-header"
          className="bg-indigo-700 text-white text-center"
          style={{
            width: "100%",
            height: "50px",
          }}
        >
          <div className="flex justify-between ">
            <ExpandMoreIcon />
            <h2 className="text-xl flex flex-1 font-semibold">
              Abstract of Estimated Cost Description{" "}
            </h2>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className=" flex justify-start gap-40">
              {proposalDetails1.map((detail, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-bold">{detail.label}:</span>
                  <span>{detail.content}</span>
                </div>
              ))}
            </div>

            {/* <p>{projectDesc}</p> */}
          </div>
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

const EstimatedCost: React.FC = () => {
  return (
    <div className=" mx-auto mt-0 p-4">
      <DetailsCards />
    </div>
  );
};

export default EstimatedCost;
