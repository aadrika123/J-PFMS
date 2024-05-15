"use client";
import React, { useState } from "react";
import Stepper from "./molecules/Stepper";
import BoxContainer from "./molecules/BoxContainer";
import Steps from "./molecules/Steps";
import ViewDetails from "./molecules/ViewDetails";
import Table from "@/components/global/molecules/Table";
import admi from "@/assets/svg/admi.svg";
import { useQuery } from "react-query";
// import { usePathname } from "next/navigation";
import { useUser } from "@/components/global/molecules/general/useUser";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import { HeaderWidget } from "./HeaderWidget";
import Button from "@/components/global/atoms/Button";
import Popup from "@/components/global/molecules/Popup";
import Loader from "@/components/global/atoms/Loader";
// import Image from "next/image";

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
  const items = [
    {
      info: "BACK OFFICE",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER",
      img: admi,
    },
    {
      info: "CITY MANAGER",
      img: admi,
    },
  ];

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
    const doc = data?.files.find((item: any) => item.id === id);
    const handleClick = () => {
      setState((prev: any) => ({
        ...prev,
        showPopup: !showPopup,
        docData: doc,
      }));
    };

    return (
      <img
        onClick={handleClick}
        className="h-8 w-12 object-contain"
        src={`http://localhost:2001/public/pdfs/${doc?.path}`}
        alt=""
      />
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
            className=""
            src={`http://localhost:2001/public/pdfs/${docData?.path}`}
            width="1000"
            height="620"
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
      {!data ? <Loader/> : <>
        <Stepper items={items} activeStepper={1 || user?.getUserLevel()} />
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
              <Table columns={columns} data={data?.files} center />
            </div>
          )
        )}
        </>}

      </div>
    </>
  );
};

export default ViewProjectProposal;
