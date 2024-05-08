"use client";
import Button from "@/components/global/atoms/Button";
import goBack from "@/utils/helper";
import React, { ReactNode } from "react";
import { Icons } from "@/assets/svg/icons";
import { usePathname } from "next/navigation";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";

const BillLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
        <Button
          variant="cancel"
          className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
          onClick={goBack}
        >
          {Icons.back}
          <b>Back</b>
        </Button>
        <h2 className="text-black">
          <b>Bills Verify</b>
        </h2>
      </div>
      <div className="flex items-center mb-4">
      <LinkWithLoader href={`/bills-verify`}>
        <Button
          variant="primary"
          className={`mr-4 ${pathname.includes("outbox") && "bg-gray-200 text-gray-500"}`}
        >
          {Icons.outbox}
          Inbox
        </Button>
        </LinkWithLoader>
        <LinkWithLoader href={`${pathname.includes('bills-verify/view') ? '/bills-verify/outbox' : pathname+'/outbox'}`}>
          <Button
            variant="primary"
            className={`${!pathname.includes("outbox") && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Outbox
          </Button>
        </LinkWithLoader>
      </div>
      {children}
    </>
  );
};

export default BillLayout;
