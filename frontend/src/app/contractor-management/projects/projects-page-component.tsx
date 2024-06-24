"use client"

import React from "react";

import HeaderWithTitleAndBackButton from "./components/header-with-title-and-back-button";
import { useSearchParams } from "next/navigation";
import MultipleSectionManagerComponent from "./components/multiple-section-manager/multiple-section-manager-component";
import { ContractorManagementPageSectionComponent } from "./components/section/page-section-component";
import { useContractManagementInboxData } from "./data/contract-management-inbox-data";
import { useContractDetailsData } from "./components/section/components/details-view/contract-details-data";
import { useContractManagementOutboxData } from "./data/contract-management-outbox-data";
import { useContractManagementRunningTendersData } from "./data/contract-management-running-tenders-data";

export const ContractorManagementProjectsPageComponent = () => {

  // Currently Selected Project Proposal data should be loaded first
  const searchParams = useSearchParams();
  useContractDetailsData(Number(searchParams?.get("proposalId")));

  return (
    <>

      <HeaderWithTitleAndBackButton title="Assigend Work" />

      <MultipleSectionManagerComponent sections={[

        {
          title: "Inbox", 
          queryHook: useContractManagementInboxData,
          component: <ContractorManagementPageSectionComponent queryHook={useContractManagementInboxData}/>
        },

        {
          title: "Outbox",
          queryHook: useContractManagementOutboxData,
          component: <ContractorManagementPageSectionComponent queryHook={useContractManagementOutboxData} />
        },

        {
          title: "Running Tenders",
          queryHook: useContractManagementRunningTendersData,
          component: <ContractorManagementPageSectionComponent queryHook={useContractManagementRunningTendersData} />
        }
        
      ]} />


    </>
  );
}