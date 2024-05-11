import EditProjectProposal from "@/components/JuidcoPfms/page/ProjectProposal/EditProjectProposal";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <EditProjectProposal ProProposalId={id} />
    </PageLayout>
  );
};

export default page;
