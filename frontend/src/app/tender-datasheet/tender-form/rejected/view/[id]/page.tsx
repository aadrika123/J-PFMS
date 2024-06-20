import ViewTenderingProject from "@/components/JuidcoPfms/page/TenderDatasheet/ViewTenderingProject";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({params}: {params: {id: number}}) => {
  const {id} = params;
  return (
    <PageLayout>
      <ViewTenderingProject ProProposalId={id} />
    </PageLayout>
  );
};

export default page;