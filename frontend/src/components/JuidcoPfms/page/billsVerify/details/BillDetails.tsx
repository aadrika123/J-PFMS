"use client";

import React, { useState } from "react";
import Stepper from "./Stepper";
import BoxContainer from "./BoxContainer";
import Steps from "./Steps";
import ViewDetails from "./ViewDetails";
import Table from "@/components/global/molecules/Table";
import Action from "./Action";
import admi from "@/assets/svg/admi.svg";
import axios from "@/lib/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FINANCE_URL } from "@/utils/api/urls";
import Loader from "@/components/global/atoms/Loader";
import { useSelector } from "react-redux";
import { User } from "pfmslib";
import Popup from "@/components/global/molecules/Popup";
import Button from "@/components/global/atoms/Button";
import toast, { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import Input from "@/components/global/atoms/Input";

type BillDetailProps = {
  billId: string | number;
};

const BillDetails: React.FC<BillDetailProps> = (props) => {
  const user = useSelector((state: any) => state.user.user?.userDetails);
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const userObj = new User(user);
  const { billId } = props;
  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    docData: null,
    showRemarkPopup: false,
    remarks: "",
  });

  const fetch = async (endpoint: string) => {
    try {
      const res = await axios({
        url: endpoint,
        method: "GET",
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: billData, isFetching: isFetching } = useQuery(
    ["bill-details", billId],
    () => fetch(`${FINANCE_URL.BILLS_VERIFICATION.getById}/${billId}`)
  );

  //////////// Getting documents
  const { data: docs } = useQuery(["documents", billId], () =>
    fetch(`${FINANCE_URL.BILLS_VERIFICATION.getDoc}/${billId}`)
  );

  const { activeStep, showPopup, docData, showRemarkPopup, remarks } = state;
  const items = [
    {
      info: "JUNIOR ENGINEER",
      img: admi,
    },
    {
      info: "ASSISTANT ENGINEER",
      img: admi,
    },
    {
      info: "EXECUTIVE ENGINEER",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
    {
      info: "ACCOUNT DEPARTMENT (MANAGER)",
      img: admi,
    },
    {
      info: "INTERNAL AUDITOR",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
    {
      info: "ACCOUNTS DEPARTMENT (PDF)",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
  ];

  /////// View Button
  const ViewButton = (id: number | string) => {
    const handleClick = () => {
      const data = docs.find((item: any) => item.id === id);
      setState({ ...state, docData: data });
      setState((prev: any) => ({ ...prev, showPopup: !showPopup }));
    };

    return (
      <img
        onClick={handleClick}
        className="h-8 w-12"
        src={`http://localhost:5001/public/doc-1714194909931-257971763.jpeg`}
        alt=""
      />
    );
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    {
      name: "description",
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

  ///////////// Handling step click ///////////
  const handleStepClick = (step: number) => {
    setState({ ...state, activeStep: step });
  };

  //////////////// handling Verify Documents ///////////////
  const handleVerifyDoc = async () => {
    const res = await axios({
      url: `${FINANCE_URL.BILLS_VERIFICATION.approveDoc}`,
      method: "POST",
      data: {
        data: {
          billId: docData?.bill_id,
          docId: docData?.id,
          description: docData?.description,
          path: docData?.path,
          remarks,
        },
      },
    });

    if (!res.data.status) {
      toast.error("Something Went Wrong");
      throw "Something Went Wrong";
    }

    // queryClient.invalidateQueries();
    toast.success("Document Verifyed Successfully!!");
    setState((prev: any) => ({
      ...prev,
      showPopup: false,
      showRemarkPopup: !showRemarkPopup,
    }));
  };

  const app = useMutation(handleVerifyDoc, {
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  //////////////// handling reject Documents ///////////////
  const handleRejectDoc = async () => {
    const res = await axios({
      url: `${FINANCE_URL.BILLS_VERIFICATION.rejectDoc}`,
      method: "POST",
      data: {
        data: {
          billId: docData?.bill_id,
          docId: docData?.id,
          description: docData?.description,
          path: docData?.path,
          remarks,
        },
      },
    });

    if (!res.data.status) {
      toast.error("Something Went Wrong");
      throw "Something Went Wrong";
    }

    queryClient.invalidateQueries();
    toast.success("Document Rejected Successfully!!");
    setState((prev: any) => ({
      ...prev,
      showPopup: false,
      showRemarkPopup: !showRemarkPopup,
    }));
  };

  const rej = useMutation(handleRejectDoc, {
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  return (
    <>
      <Toaster />
      {showRemarkPopup && (
        <Popup>
          <Input
            onChange={(e) =>
              setState((prev: any) => ({ ...prev, remarks: e.target.value }))
            }
            label="Remark"
            placeholder="Enter Remarks"
            name="remark"
            required
          />
          <div className="flex justify-between">
            {docData?.approved !== "verified" && (
              <Button
                onClick={app.mutate}
                variant="primary"
                className={`${!remarks && "cursor-not-allowed"}`}
                disabled={!remarks}
              >
                Approve
              </Button>
            )}
            <Button
              onClick={rej.mutate}
              variant="danger"
              className={`mx-2 hover:bg-red-300 ${!remarks && "cursor-not-allowed"}`}
              disabled={!remarks}
            >
              Reject
            </Button>
            <Button
              onClick={() =>
                setState({
                  ...state,
                  showRemarkPopup: !showRemarkPopup,
                  showPopup: !showPopup,
                })
              }
              variant="cancel"
              className=""
            >
              Close
            </Button>
          </div>
        </Popup>
      )}
      {showPopup && (
        <Popup padding="0">
          <iframe
            className=""
            src={`http://localhost:5001/public/pdfs/${docData?.path}`}
            width="1000"
            height="720"
          ></iframe>
          <div className="flex items-center absolute bottom-3 self-center">
            {!pathname.includes("outbox") && (
              <Button
                onClick={() =>
                  setState({
                    ...state,
                    showRemarkPopup: !showRemarkPopup,
                    showPopup: !showPopup,
                  })
                }
                variant="primary"
                className="mx-2"
              >
                Click to Verify
              </Button>
            )}
            <Button
              onClick={() => setState({ ...state, showPopup: !showPopup })}
              variant="cancel"
            >
              Close
            </Button>
          </div>
        </Popup>
      )}
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Stepper
            items={items}
            activeStepper={
              billData?.approval_stage_id + 1 || userObj.getUserLevel()
            }
          />
          <BoxContainer billDetails={billData} />
          <Steps
            handleClick={handleStepClick}
            activeStep={activeStep}
            className="mt-4"
          />
          {activeStep === 0 ? (
            <ViewDetails billDetails={billData} />
          ) : activeStep === 1 ? (
            <div className="mt-4">
              <Table columns={columns} data={docs} center />
            </div>
          ) : (
            <Action billId={Number(billId)} billData={billData} />
          )}
        </>
      )}
    </>
  );
};

export default BillDetails;

// : activeStep === 2 ? (
//   <div className="mt-4">
//     <Table columns={columns} data={[]} center />
//   </div>
// ) : (
