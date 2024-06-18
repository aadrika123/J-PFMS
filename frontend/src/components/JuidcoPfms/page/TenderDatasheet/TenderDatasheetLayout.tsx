"use client";

import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";
import { useUser } from "@/components/global/molecules/general/useUser";
import goBack from "@/utils/helper";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface TenderDatasheetLayoutProps {
  children: ReactNode;
}

export const TenderDatasheetLayout = ({
  children,
}: TenderDatasheetLayoutProps) => {
  const pathName = usePathname();
  const user = useUser();
  //   const { data: outboxItemCount } = useProjectProposalOutboxItemCount();
  //   const { data: inboxItemCount } = useProjectProposalInboxItemCount();

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
          <b>Project List</b>
        </h2>
      </div>
      <div className="flex items-center mb-2 gap-2">
        <LinkWithLoader href={`/tender-datasheet`}>
          <Button
            variant="primary"
            className={`${(pathName.includes("outbox") || pathName.includes("rejected")) && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Inbox
            <div className="badge badge-secondary">
              {/* ({inboxItemCount?.count}) */}
            </div>
          </Button>
        </LinkWithLoader>
        <LinkWithLoader href={`/tender-datasheet/outbox`}>
          <Button
            variant="primary"
            className={`${!pathName.includes("outbox") && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            {user && user?.getUserLevelForTenderApproval() < 3 ? "Outbox" : "Sent For Tendering"}
            <div className="badge badge-secondary">
              {/* ({outboxItemCount?.count}) */}
            </div>
          </Button>
        </LinkWithLoader>

        {user && user?.getUserLevelForTenderApproval() < 3 && <LinkWithLoader href={"/tender-datasheet/rejected"}>
          <Button
            variant="primary"
            className={`${!pathName.includes("rejected") && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Rejected
            <div className="badge badge-secondary">
              {/* ({outboxItemCount?.count}) */}
            </div>
          </Button>
        </LinkWithLoader>}
      </div>

      <div className="w-full mt-4 flex gap-2 ">{children}</div>
    </>
  );
};
