"use client";

import ViewTenderFormDetails from "@/components/JuidcoPfms/page/TenderDatasheet/TenderInputForms/ViewTenderFormDetails";
import PageLayout from "@/components/Layouts/PageLayout";
import goBack from "@/utils/helper";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <ViewTenderFormDetails
        handleTabChange={goBack}
        tenderFormId={id}
      />
    </PageLayout>
  );
};

export default page;
