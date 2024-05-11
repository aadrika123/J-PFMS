import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";
import ProjectProposalApprovalView from "./ProjectProposalApprovalView";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <ProjectProposalApprovalView ProProposalId={Number(id)} />
    </PageLayout>
  );
};

export default page;
