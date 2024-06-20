"use client"

import React from "react";

import HeaderWithTitleAndBackButton from "./header-with-title-and-back-button";
import MultipleSectionManagerComponent from "./multiple-section-manager-component";
import { InboxComponent } from "@/app/engineering/projects/components/sections/inbox-section-component-old";
import { OutboxComponent } from "@/app/engineering/projects/components/sections/outbox-section-component-old";
import { ReadyForTenderingSectionComponent } from "@/app/engineering/projects/components/sections/ready-for-tendering-section-component";


export const ProjectsComponent = () => {

  return (
    <>

      <HeaderWithTitleAndBackButton title="Assigend Work" />

      <MultipleSectionManagerComponent sections={[

        {title: "Inbox", component: <InboxComponent />, count: -1},
        {title: "Outbox", component: <OutboxComponent />, count: 0},
        {title: "Fully Approved", component: <ReadyForTenderingSectionComponent />, count: 0},

      ]} />


    </>
  );
}