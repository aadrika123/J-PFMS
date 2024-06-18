"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 07-05-2024
 * | Created for- Project Proposal View Screen
 * | Status- open
 */

import React, { useState } from "react";
import Table from "@/components/global/molecules/Table";
import admi from "@/assets/svg/admi.svg";
import { useQuery } from "react-query";
// import { usePathname } from "next/navigation";
import { useUser } from "@/components/global/molecules/general/useUser";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import { HeaderWidget } from "./HeaderWidget";
import Popup from "@/components/global/molecules/Popup";
import Button from "@/components/global/atoms/buttons/Button";
import Loader from "@/components/global/atoms/Loader";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import Image from "next/image";
import BoxContainer from "../../projectProposalMolecules/BoxContainer";
import Steps from "../../projectProposalMolecules/Steps";
import ViewDetails from "../../projectProposalMolecules/ViewDetails";
// import ProjectProposalApprovalStepper from "../../projectProposalMolecules/ProjectProposalApprovalStepper";

const ViewProjectProposal = ({ ProProposalId }: { ProProposalId: number }) => {
  const user = useUser();
  //   const pathname = usePathname();
  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    remarks: "",
    docData: null,
  });

  const { activeStep, showPopup, docData } = state;
  // const items = [
  //   {
  //     info: "BACK OFFICE",
  //     img: admi,
  //     level: 0,
  //     approvalAmount: 100,
  //   },
  //   {
  //     info: "TECHNICAL DEPARTMENT",
  //     img: admi,
  //     level: 1,
  //     others: [
  //       {
  //         info: "JUNIOR ENGINEER",
  //         img: admi,
  //         approvalAmount: 200,
  //       },
  //       {
  //         info: "ASSISTANT ENGINEER",
  //         img: admi,
  //         approvalAmount: 300,
  //       },
  //       {
  //         info: "EXECUTIVE ENGINEER",
  //         img: admi,
  //         approvalAmount: 400,
  //       },
  //       {
  //         info: "SUPERINTENDENT ENGINEER",
  //         img: admi,
  //         approvalAmount: 400,
  //       },

  //       {
  //         info: "CHIEF ENGINEER",
  //         img: admi,
  //         approvalAmount: 400,
  //       },
  //     ],
  //   },
  //   {
  //     info: "ADMINISTRATIVE DEPARTMENT",
  //     img: admi,
  //     level: 2,
  //     others: [
  //       {
  //         info: "DEPARTMENTAL SECRETARY",
  //         img: admi,
  //         approvalAmount: 200,
  //       },
  //       {
  //         info: "DEPARTMENTAL MINISTER",
  //         img: admi,
  //         approvalAmount: 300,
  //       },
  //       {
  //         info: "YOJNA PRADHIKRIT SAMITI",
  //         img: admi,
  //         approvalAmount: 400,
  //       },
  //       {
  //         info: "CABINET",
  //         img: admi,
  //         approvalAmount: 400,
  //       },
  //     ],
  //   },
  // ];

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.PROJ_RPOPOSAL_URL.getById}/${ProProposalId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(["pro-proposal", ProProposalId], fetch);

  /////// View Button
  const ViewButton = (id: number | string) => {
    // const doc = data?.files.find((item: any) => item.id === id);
    const handleClick = () => {
      setState((prev: any) => ({
        ...prev,
        showPopup: !showPopup,
        docData: data.file,
      }));
    };

    return (
      <div onClick={handleClick}>
        {data.file?.path.split(".")[1] !== "pdf" ? (
          <img
            className="w-12 h-12"
            src={`${data.file?.path}`}
            alt=""
          />
        ) : (
          <Image src={pdfIcon} width={30} height={30} alt="pdf-icon" />
        )}
      </div>
    );
  };

  ///////////// Handling step click ///////////
  const handleStepClick = (step: number) => {
    setState({ ...state, activeStep: step });
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    {
      name: "file_name",
      caption: "Document Name",
    },
    {
      name: "path",
      caption: "View",
      value: ViewButton,
    },
    {
      name: "approved",
      caption: "Status",
    },
    {
      name: "remarks",
      caption: "Remarks",
    },
  ];
  
  return (
    <>
      {showPopup && (
        <Popup padding="0">
          <iframe
            width={1000}
            height={570}
            src={`${docData?.path}`}
          ></iframe>
          <div className="flex items-center absolute bottom-3 self-center">
            <Button
              onClick={() => setState({ ...state, showPopup: !showPopup })}
              variant="cancel"
            >
              Close
            </Button>
          </div>
        </Popup>
      )}
      <HeaderWidget
        title="Project Details"
        variant={"view"}
        editVisible={true}
        isDisabled={user?.getUserLevel() && user?.getUserLevel() > 2}
        // user?.getUserLevel() && user?.getUserLevel() < 2
        //  handleEditMode?: () => void;
      />
      <div className="shadow-lg bg-white p-4 border">
        {!data ? (
          <Loader />
        ) : (
          <>
            {/* <ProjectProposalApprovalStepper
              level={1}
              subLevel={1}
              budget={400}
              items={items}
            /> */}
            <BoxContainer projectDetails={data} />
            <Steps
              handleClick={handleStepClick}
              activeStep={activeStep}
              className="mt-4"
            />
            {activeStep === 0 ? (
              <ViewDetails projectDetails={data} />
            ) : (
              activeStep === 1 && (
                <div className="mt-4">
                  <Table columns={columns} data={[data?.file]} center />
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ViewProjectProposal;
