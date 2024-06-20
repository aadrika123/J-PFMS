"use client";

import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import { ContractorManagementProjectsPageComponent } from "./projects-page-component";

const Page = () => {
  return (
    <PageLayout>
      <ContractorManagementProjectsPageComponent />
    </PageLayout>
  );
};

export default Page;
