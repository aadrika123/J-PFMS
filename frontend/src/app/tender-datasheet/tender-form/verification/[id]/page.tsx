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
        componentRef={componentRef}
        handleTabChange={goBack}
        tenderFormId={id}
      />
    </PageLayout>
  );
};

export default page;
