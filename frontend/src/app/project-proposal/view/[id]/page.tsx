import ViewProjectProposal from "@/components/JuidcoPfms/page/ProjectProposal/ViewProjectProposal";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <ViewProjectProposal ProProposalId={id} />
    </PageLayout>
  );
};

export default page;
