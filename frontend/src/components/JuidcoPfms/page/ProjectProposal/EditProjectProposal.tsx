"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-05-2024
 * | Created for- Project Proposal Edit
 * | Status- open
 */

import React, { useState } from "react";
import { ProjectProposalForm } from "./ProjectProposalForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import goBack, { DateFormatter } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import toast, { Toaster } from "react-hot-toast";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { useUser } from "@/components/global/molecules/general/useUser";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { upload } from "@/utils/fileUploadAndGet";

const EditProjectProposal = ({ ProProposalId }: { ProProposalId: number }) => {
  const user = useUser();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const parma: any = useSearchParams().get("mode");
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    showNotification: false,
    showConfirmation: false,
    projectData: null,
  });

  const { showNotification, showConfirmation, projectData } = state;

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

  ///////// Handle Submit
  const handleSubmit = async (values: any) => {
    activateWorkingAnimation();
    if (!String(values.file.path).includes("https")) {
      const file_path = await upload(values.file.path);

      values.file.path = file_path;
    }
    const data = {
      ...values,
      wards: values.wards.map((i: any) => i.value),
    };

    const res = await axios({
      url: `${PFMS_URL.PROJ_RPOPOSAL_URL.update}/${ProProposalId}`,
      method: "POST",
      data: {
        data,
      },
    });

    if (!res.data.status) throw "Something Went Wrong";

    return res.data.data;
  };

  const { mutate } = useMutation(handleSubmit, {
    onSuccess: () => {
      setState({ ...state, showNotification: true, showConfirmation: false });
      setTimeout(() => {
        setState({ ...state, showNotification: false });
        goBack();
      }, 1000);
    },
    onError: () => {
      toast.error("Something Went Wrong!!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["pro-proposal", ProProposalId]);
      hideWorkingAnimation();
    },
  });

  /////// Handle showing comfirmation popup
  const handleConfirmSubmit = (values: any) => {
    setState({
      ...state,
      showConfirmation: true,
      projectData: values,
    });
  };

  ////////////// handle cancle /////////////
  const handleCancel = () => {
    setState({ ...state, showConfirmation: false });
  };

  ////////////// handle cancle /////////////
  const handleContinue = () => {
    mutate(projectData);
    setState({ ...state, showConfirmation: false });
  };

  return (
    <>
      <Toaster />
      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to update proposal?"
          cancel={handleCancel}
          continue={handleContinue}
        />
      )}
      {workingAnimation}
      {showNotification && (
        <SuccesfullConfirmPopup message="Updated successfully" />
      )}
      <HeaderWidget
        title="Project Details"
        variant={parma === "view" ? "view" : "edit"}
        editVisible={true}
        //  handleEditMode?: () => void;
        //  handlePrint?: () => void;
      />
      {data && (
        <ProjectProposalForm
          onSubmit={handleConfirmSubmit}
          enableReinitialize
          initialValues={{
            title: data?.title,
            description: data?.description,
            address: data?.address,
            proposed_by: data?.proposed_by,
            type_id: data?.type_id,
            district_id: data?.district_id,
            ulb_id: data?.ulb_id,
            ward_id: data?.ward_id,
            pin_code: data?.pin_code,
            file: {
              file_name: data?.file?.file_name ?? "",
              size: data?.file?.size ?? "",
              path: data?.file?.path ?? "",
            },
            state_id: data?.state_id,
            wards: data?.wards.map((i: any) => {
              return { value: i.ward_id, label: i.ward_name };
            }),
            proposed_date: DateFormatter(data?.date),
            execution_body: data?.execution_body,
            user_id: user?.getUserId(),
          }}
          readonly={parma === "view"}
          additionalData={{
            type: data?.type,
            ward_no: data?.wards.map((i: any) => i.ward_name).join(","),
          }}
        />
      )}
    </>
  );
};

export default EditProjectProposal;
