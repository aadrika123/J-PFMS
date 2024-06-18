"use client";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Tender Datasheet View Details
 * | Status- open
 */

import React, { useState } from "react";
import Loader from "@/components/global/atoms/Loader";
import Image from "next/image";
import Table from "@/components/global/molecules/Table";
import { useQuery, useQueryClient } from "react-query";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import BoxContainer from "../../projectProposalMolecules/BoxContainer";
import Steps from "../../projectProposalMolecules/Steps";
import ViewDetails from "../../projectProposalMolecules/ViewDetails";
import Popup from "@/components/global/molecules/Popup";
import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
import { Icons } from "@/assets/svg/icons";
import { usePathname, useRouter } from "next/navigation";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import ProjectProposalApprovalStepper from "../../projectProposalMolecules/ProjectProposalApprovalStepper";
import admi from "@/assets/svg/admi.svg";
import { useUser } from "@/components/global/molecules/general/useUser";
import Action from "../../projectProposalMolecules/Action";

const ViewTenderingProject = ({ ProProposalId }: { ProProposalId: number }) => {
  const router = useRouter();
  const user = useUser();
  const queryClient = useQueryClient();
  const [, activateWorkingAnimation] = useWorkingAnimation();

  const pathName = usePathname();
  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    remarks: "",
    docData: null,
  });

  const { activeStep, showPopup, docData } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_FORM.getProjectProposalById}/${ProProposalId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(["pro-proposal", ProProposalId], fetch);

  /////// View Button
  const ViewButton = (id: number | string) => {
    const doc = data?.files.find((item: any) => item.id === id);
    const handleClick = () => {
      setState((prev: any) => ({
        ...prev,
        showPopup: !showPopup,
        docData: doc,
      }));
    };

    return (
      <div onClick={handleClick}>
        {doc?.path.split(".")[1] !== "pdf" ? (
          <img
            className="w-12 h-12"
            src={`${process.env.img_base}${doc?.path}`}
            alt=""
          />
        ) : (
          <Image src={pdfIcon} width={30} height={30} alt="pdf-icon" />
        )}
      </div>
    );
  };

  ////////////// handleOpenTenderInputForm //////////
  const handleOpenTenderInputForm = () => {
    activateWorkingAnimation();
    if (user?.isJuniorEngineer() && !pathName.includes("outbox")) {
      router.push(
        `${pathName.split("/view")[0]}/add/${data.tender_datasheet_id}?pageNo=1`
      );
    } else {
      router.push(
        `${pathName.split("/view")[0]}/verification/${data.tender_datasheet_id}`
      );
    }
  };

  ///////////// Handling step click ///////////
  const handleStepClick = (step: number) => {
    setState({ ...state, activeStep: step });
  };

  /////////// Handle Add Tender From ////////////
  const handleAddTenderForm = async () => {
    try {
      activateWorkingAnimation();
      const res = await axios({
        url: `${PFMS_URL.TENDER_FORM.create}`,
        method: "POST",
        data: {
          data: {
            project_proposal_id: data.id,
          },
        },
      });

      if (!res.data.status) throw "Someting Went Wrong!!";

      queryClient.invalidateQueries(["project-proposals-tender"]),
        router.push(
          `${pathName.split("/view")[0]}/add/${res.data.data.id}?pageNo=1`
        );
    } catch (error) {
      console.log(error);
    }
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

  const items = [
    {
      info: "JUNIOR ENGINEER",
      img: admi,
      level: 0,
    },
    {
      info: "EXECUTIVE ENGINEER",
      img: admi,
      level: 1,
    },
    {
      info: "EXECUTIVE OFFICER",
      img: admi,
      level: 2,
    },
    {
      info: "SENT FOR TENDERING",
      img: admi,
      level: 3,
    },
  ];
  return (
    <>
      {showPopup && (
        <Popup padding="0">
          <iframe
            width={1000}
            height={570}
            src={`${process.env.img_base}${docData?.path}`}
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
      <>
        {!data ? (
          <Loader />
        ) : (
          <>
            <div className="shadow-lg bg-white p-4 border mb-4 flex justify-between items-center">
              <Button
                variant="cancel"
                className="border-none shadow-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
                onClick={goBack}
              >
                {Icons.back}
                <b>Back</b>
              </Button>
              {!data.tender_datasheet_id && user?.isJuniorEngineer() ? (
                <Button
                  variant="primary"
                  className="border-none"
                  onClick={handleAddTenderForm}
                >
                  <b>Prepare Tender Input Form</b>
                  <div className="h-4 w-4 bg-white text-black rounded-full flex justify-center items-center">
                    +
                  </div>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="border-none"
                  onClick={handleOpenTenderInputForm}
                >
                  <b>View Prepare Tender Input Form</b>
                </Button>
              )}
            </div>
            <div className="shadow-lg bg-white p-4 border">
              {data.assigned_level - 1 >= 0 && (
                <ProjectProposalApprovalStepper
                  level={data.assigned_level - 1}
                  items={items}
                />
              )}
              <BoxContainer projectDetails={data} />
              <Steps
                handleClick={handleStepClick}
                activeStep={activeStep}
                className="mt-4"
                level={data.assigned_level - 1}
              />
              {activeStep === 0 ? (
                <ViewDetails projectDetails={data} />
              ) : activeStep === 1 ? (
                <div className="mt-4">
                  <Table columns={columns} data={data?.files} center />
                </div>
              ) : (
                activeStep === 2 && (
                  <div className="mt-4">
                    <Action
                      tenderDatasheetId={Number(data.tender_datasheet_id)}
                      readOnly={
                        pathName.includes("outbox") ||
                        pathName.includes("rejected") ||
                        user?.isJuniorEngineer()
                      }
                    />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </>
    </>
  );
};

export default ViewTenderingProject;
