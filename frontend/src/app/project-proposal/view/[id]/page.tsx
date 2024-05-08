import EditViewProjectProposal from "@/components/JuidcoPfms/page/ProjectProposal/EditViewProjectProposal";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <EditViewProjectProposal ProProposalId={id} />
    </PageLayout>
  );
};

export default page;
