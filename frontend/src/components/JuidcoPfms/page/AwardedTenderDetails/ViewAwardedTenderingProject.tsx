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

const ViewAwardedTenderingProject = ({
  ProProposalId,
}: {
  ProProposalId: number;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();

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
      url: `${PFMS_URL.AWARDED_TENDER_FORM.getProjectProposalById}/${ProProposalId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(["pro-proposal-awarded", ProProposalId], fetch);

  /////// View Button
  const ViewButton = (id: number | string) => {
    console.log(`d3f${id}dsf3`);
    const handleClick = () => {
      setState((prev: any) => ({
        ...prev,
        showPopup: !showPopup,
        docData: data.file,
      }));
    };

    return (
      <div onClick={handleClick}>
        {!data.file?.path.includes(".pdf") ? (
          <img className="w-12 h-12" src={`${data.file?.path}`} alt="" />
        ) : (
          <Image src={pdfIcon} width={30} height={30} alt="pdf-icon" />
        )}
      </div>
    );
  };

  ////////////// handleOpenTenderInputForm //////////
  const handleOpenTenderInputForm = () => {
    activateWorkingAnimation();
    router.push(
      `${pathName.split("/view")[0]}/add/${data.tender_datasheet_id}?pageNo=1`
    );
  };

  ///////////// Handling step click ///////////
  const handleStepClick = (step: number) => {
    setState({ ...state, activeStep: step });
  };

  /////////// Handle Add Tender From ////////////
  const handleAddAwardedTenderForm = async () => {
    try {
      activateWorkingAnimation();
      const res = await axios({
        url: `${PFMS_URL.AWARDED_TENDER_FORM.create}`,
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

  return (
    <>
      {workingAnimation}
      {showPopup && (
        <Popup padding="0">
          <iframe width={1000} height={570} src={`${docData?.path}`}></iframe>
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
              {!data.tender_datasheet_id ? (
                <Button
                  variant="primary"
                  className="border-none"
                  onClick={handleAddAwardedTenderForm}
                >
                  <b>Prepare Awarded Tender Form</b>
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
                  <b>View Awarded Tender Form</b>
                </Button>
              )}
            </div>
            <div className="shadow-lg bg-white p-4 border">
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
            </div>
          </>
        )}
      </>
    </>
  );
};

export default ViewAwardedTenderingProject;
