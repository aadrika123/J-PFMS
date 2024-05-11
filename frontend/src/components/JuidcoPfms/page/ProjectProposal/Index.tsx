"use client";
import React from "react";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import ProjectManagementInboxPage from "@/app/project-management/(inbox)/ProjectManagementInboxPage";
// import { PFMS_URL } from "@/utils/api/urls";
// import ViewButton from "@/components/global/atoms/ViewButton";
// import TableWithFeatures from "@/components/global/atoms/TableWithFeatures";

const HeroProjectProposal = () => {
  // const columns = [
  //   { name: "id", caption: "Sr. No." },
  //   {
  //     name: "project_proposal_no",
  //     caption: "Proposal Number",
  //   },
  //   {
  //     name: "ulb_name",
  //     caption: "Ulb",
  //   },
  //   {
  //     name: "ward_name",
  //     caption: "Ward No",
  //   },
  //   {
  //     name: "date",
  //     caption: "Date",
  //   },
  //   {
  //     name: "view",
  //     caption: "View",
  //     value: ViewButton,
  //   },
  // ];
  return (
    <>
      <HeaderWidget variant="add" title="Project Proposal" />
      <div className="shadow-lg p-4 border">
        <ProjectManagementInboxPage />

        {/* <TableWithFeatures
          center
          columns={columns}
          api={`${PFMS_URL.PROJ_RPOPOSAL_URL.get}`}
          numberOfRowsPerPage={10}
        /> */}
      </div>
    </>
  );
};

export default HeroProjectProposal;
