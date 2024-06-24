import ViewAwardedTenderingProject from "@/components/JuidcoPfms/page/AwardedTenderDetails/ViewAwardedTenderingProject";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({params}: {params: {id: number}}) => {
  const {id} = params;
  return (
    <PageLayout>
      <ViewAwardedTenderingProject ProProposalId={id} />
    </PageLayout>
  );
};

export default page;