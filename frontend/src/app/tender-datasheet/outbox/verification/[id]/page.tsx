"use client";

import ViewTenderFormDetails from "@/components/JuidcoPfms/page/TenderDatasheet/TenderInputForms/ViewTenderFormDetails";
import PageLayout from "@/components/Layouts/PageLayout";
import goBack from "@/utils/helper";
import React, { useRef } from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const componentRef = useRef<any>();
  return (
    <PageLayout>
      <ViewTenderFormDetails
        handleTabChange={goBack}
        tenderFormId={id}
        componentRef={componentRef}
      />
    </PageLayout>
  );
};

export default page;
