"use client"

import React from "react";

import HeaderWithTitleAndBackButton from "./components/header-with-title-and-back-button";
import { useProjectProposalDetails, useProjectProposalsInboxList, useProjectProposalsOutboxList } from "@/hooks/data/ProjectProposalsHooks";
import { useSearchParams } from "next/navigation";
import MultipleSectionManagerComponent from "./components/multiple-section-manager/multiple-section-manager-component";
import { ContractorManagementPageSectionComponent } from "./components/section/page-section-component";

export const ContractorManagementProjectsPageComponent = () => {

  // Currently Selected Project Proposal data should be loaded first
  const searchParams = useSearchParams();
  useProjectProposalDetails(Number(searchParams?.get("proposalId")));

  return (
    <>

      <HeaderWithTitleAndBackButton title="Assigend Work" />

      <MultipleSectionManagerComponent sections={[

        {
          title: "Inbox", 
          queryHook: useProjectProposalsInboxList,
          component: <ContractorManagementPageSectionComponent queryHook={useProjectProposalsInboxList}/>
        },

        {
          title: "Outbox",
          queryHook: useProjectProposalsOutboxList,
          component: <ContractorManagementPageSectionComponent queryHook={useProjectProposalsOutboxList} />
        },

        {
          title: "Running Tenders",
          queryHook: useProjectProposalsOutboxList,
          component: <ContractorManagementPageSectionComponent queryHook={useProjectProposalsOutboxList} />
        }
        
      ]} />


    </>
  );
}