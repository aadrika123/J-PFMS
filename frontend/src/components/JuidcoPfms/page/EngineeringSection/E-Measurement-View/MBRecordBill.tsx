"use client";
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ProposalDetail {
  label: string;
  content: string;
}

const MBRecordBill: React.FC = () => {
  const [proposalDetails, setProposalDetails] = useState<ProposalDetail[]>([]);

  useEffect(() => {
    // Fetch data from the backend endpoint
    fetch("http://localhost:2001/mbrecordbill")
      .then((response) => response.json())
      .then((data) => {
        setProposalDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching proposal details:", error);
      });
  }, []);

  console.log(proposalDetails);

  return (
    <div className=" mx-auto mt-0 p-4">
      <section>
        <Accordion>
          <AccordionSummary
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
                MB Record for Bill No{" "}
              </h2>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-1 flex-col p-4 bg-slate-100">
              <div className="flex flex-1 flex-col">
                <div className="flex font-bold text-md">
                  {proposalDetails.length > 0 && proposalDetails[0]?.label}
                </div>
                <div className="flex text-md">
                  {proposalDetails.length > 0 && proposalDetails[0]?.content}
                </div>
              </div>
              <div className="flex flex-1 justify-between flex-row mt-4">
                <div className="flex flex-col">
                  <div className="flex font-bold ">
                    {proposalDetails.length > 0 && proposalDetails[1]?.label}
                  </div>
                  <div className="flex text-md">
                    {proposalDetails.length > 0 && proposalDetails[1]?.content}
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex flex-col">
                    <div className="flex font-bold ">
                      {proposalDetails.length > 0 && proposalDetails[2]?.label}
                    </div>
                    <div className="flex text-md">
                      {proposalDetails.length > 0 &&
                        proposalDetails[2]?.content}
                    </div>
                  </div>
                </div>
                <div className="flex mr-4">
                  <div className="flex flex-col">
                    <div className="flex font-bold ">
                      {proposalDetails.length > 0 && proposalDetails[3]?.label}
                    </div>
                    <div className="flex text-md">
                      {proposalDetails.length > 0 &&
                        proposalDetails[3]?.content}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 mt-4">
                <div className="flex flex-col">
                  <div className="flex font-bold ">
                    {proposalDetails.length > 0 && proposalDetails[4]?.label}
                  </div>
                  <div className="flex text-md">
                    {proposalDetails.length > 0 && proposalDetails[4]?.content}
                  </div>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
    </div>
  );
};

export default MBRecordBill;
