import ViewDetailsHero from "@/components/JuidcoPfms/page/billsVerify/viewDetails/Index";
import PageLayout from "@/components/Layouts/PageLayout";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <PageLayout>
      <ViewDetailsHero BillsId={id} />
    </PageLayout>
  );
};

export default page;
