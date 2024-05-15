"use client";
import React, { useState } from "react";
import { ProjectProposalForm } from "./ProjectProposalForm";
import { QueryClient, useMutation, useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import goBack, { DateFormatter } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { FormValues } from "@/utils/types/formikTypes";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import toast, { Toaster } from "react-hot-toast";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { useUser } from "@/components/global/molecules/general/useUser";

const EditProjectProposal = ({ ProProposalId }: { ProProposalId: number }) => {
  const user = useUser()
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
  const parma: any = useSearchParams().get("mode");
  const query = new QueryClient();
  const [state, setState] = useState({
    showNotification: false,
  });

  const { showNotification } = state;

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
  const handleSubmit = async (values: FormValues) => {
    activateWorkingAnimation();
    const files = values.files.filter(
      (item: any) => item.file_token !== "null"
    );
    const data = { ...values, files };

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
      setState({ ...state, showNotification: true });
      setTimeout(() => {
        setState({ ...state, showNotification: false });
        goBack();
      }, 1000);
    },
    onError: () => {
      toast.error("Something Went Wrong!!!");
    },
    onSettled: () => {
      hideWorkingAnimation();
      query.invalidateQueries(['pro-proposal', `${PFMS_URL.PROJ_RPOPOSAL_URL.get}`]);
    },
  });

  //// Handle files
  const handleFileData = (files: []): any[] => {
    return files.map((file: any) => ({
      ...file,
      file_token: String(file.file_token),
    }));
  };

  return (
    <>
      <Toaster />
      {workingAnimation}
      {showNotification && (
        <SuccesfullConfirmPopup message="Recorded Successfully" />
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
          onSubmit={mutate}
          enableReinitialize
          initialValues={{
            district_id: data?.district_id,
            description: data?.description,
            summary: data?.summary,
            state_id: data?.state_id,
            address: data?.address,
            date: DateFormatter(data?.date),
            pin_code: data?.pin_code,
            ulb_id: data?.ulb_id,
            ward_id: data?.ward_id,
            // execution_body: data?.execution_body,
            user_id: user?.getUserId(),
            files: handleFileData(data?.files),
          }}
          readonly={parma === "view"}
        />
      )}
    </>
  );
};

export default EditProjectProposal;
