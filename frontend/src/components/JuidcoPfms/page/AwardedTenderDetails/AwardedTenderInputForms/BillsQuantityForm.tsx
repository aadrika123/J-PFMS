"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 31-05-2024
 * | Created for- Tender Fee Details Form
 * | Status- open
 */

import Button from "@/components/global/atoms/buttons/Button";
import goBack, { removeEmptyField } from "@/utils/helper";
import { Formik, FormikValues } from "formik";
import React, { useRef, useState } from "react";
import { bg_color } from "../molecules/StaticList";
import Image from "next/image";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import FeeIcon from "@/assets/svg/Rupee.svg";
import Input from "@/components/global/atoms/Input";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import BillsIcon from "@/assets/svg/bill-quantity.svg";
import { MeasurementManagementComponent } from "../molecules/MeasurementManagementComponent";

type BillsQuantityFormProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  readonly: boolean;
};

const BillsQuantityForm: React.FC<BillsQuantityFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const { handleTabChange, tenderFormId, readonly } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<any>({
    showWarning: false,
    triggerFun: null,
    showFinalError: false,
    finalData: "",
    showConfirmation: false,
  });

  const { showWarning, triggerFun, showFinalError } = state;

  ///////// Fetching Data
  const fetch = async () => {
    const res = await axios({
      url: `${PFMS_URL.TENDER_FEE.getById}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["tender-fee-details", tenderFormId],
    fetch
  );

  const initialDetails = {
    tender_datasheet_id: data?.tender_datasheet_id || tenderFormId,
    tender_fee_examption_allowed: data?.tender_fee_examption_allowed,
    tender_fee: data?.tender_fee || "",
    processing_fee: data?.processing_fee || "",
    tender_fee_payable_to: data?.tender_fee_payable_to || "",
    tender_fee_payable_at: data?.tender_fee_payable_at || "",
    surcharges: data?.surcharges || "",
    other_charges: data?.other_charges || "",
    emd_examption_allowed: data?.emd_examption_allowed,
    emd_fee_type: data?.emd_fee_type || "",
    fixed_emd_fee: data?.fixed_emd_fee || "",
    percentage_emd_fee: data?.percentage_emd_fee || "",
    emd_fee_payable_to: data?.emd_fee_payable_to || "",
    emd_fee_payable_at: data?.emd_fee_payable_at || "",
  };

  ///// handlBackAndReset
  const handleBackAndReset = (trigger?: () => void) => {
    setState({ ...state, showWarning: !showWarning, triggerFun: trigger });
  };

  ///// handle Complete Reset
  const handleCompleteReset = () => {
    triggerFun();
    setTimeout(() => {
      setState((prev: any) => ({
        ...prev,
        file: null,
      }));
    }, 100);
  };

  /////// Handle Exemption Allowed
  const handleExemptionAllowed = (
    value: boolean,
    setFieldValue: (key: string, value: any) => void
  ) => {
    setFieldValue("emd_fee_type", value ? "" : "fixed");
  };

  //////////// Handle Save Fee Details /////////////
  const handleSave = async (values: any) => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_FEE?.create}`,
      method: "POST",
      data: {
        data: values,
      },
    });

    if (!res.data.status) throw "Something Went Wrong!!!";
  };

  const { mutate } = useMutation(handleSave, {
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(["tender-fee-openers", tenderFormId]),
        queryClient.invalidateQueries(["tender-all-details", tenderFormId]),
      ]);
      toast.success("Details Saved Successfully");
      setTimeout(() => {
        handleTabChange("next");
      }, 100);
    },
    onError: (error) => {
      toast.error("Something Went Wrong!!");
      console.log(error);
    },
    onSettled: () => {
      hideWorkingAnimation();
    },
  });

  /////// Handle Submit //////
  const onSubmit = (values: FormikValues) => {
    mutate(removeEmptyField(values));
  };

  return (
    <>
      <Toaster />
      {workingAnimation}
      {showWarning && (
        <LosingDataConfirmPopup
          continue={handleCompleteReset}
          cancel={handleBackAndReset}
        />
      )}

      {/* Form section */}
      {/* <div className="grid gap-6 max-md:grid-cols-1"> */}
      <div
        className={`bg-${bg_color} hide-scrollbar p-3 shadow-xl border rounded grid gap-4`}
      >
        <header className="flex items-center">
          <Image src={BillsIcon} height={40} width={40} alt="" />
          <h1 className="font-medium text-lg ml-2">
            Bill’s of Quantity (BOQ) Details
          </h1>
        </header>
        <div className="overflow-x-auto">
          <MeasurementManagementComponent
            readOnly={false}
            proposal_id={1}
            onNewMeasurementEntries={() => {}}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handleTabChange("prev")}
          buttontype="button"
          variant="cancel"
        >
          Back
        </Button>
        <Button
          onClick={() => handleTabChange("next")}
          buttontype="button"
          variant="cancel"
        >
          Next
        </Button>
      </div>
      {/* </div> */}
    </>
  );
};

export default BillsQuantityForm;
