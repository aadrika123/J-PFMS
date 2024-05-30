import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";
import { useProjectProposalOutboxItemCount } from "@/hooks/data/ProjectProposalsHooks";
import goBack from "@/utils/helper";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";


interface ProjectManagementLayoutProps {
  children: ReactNode
}

export const ProjectManagementLayout = ({ children }: ProjectManagementLayoutProps) => {
  const pathName = usePathname();
  const { isFetching, isLoading, data: outboxItemCount } = useProjectProposalOutboxItemCount();

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
          <b>Project Proposal List</b>
        </h2>
      </div>
      <div className="flex items-center mb-2 gap-2">
        <LinkWithLoader href={`/engineering/projects`}>
          <Button
            variant="primary"
            className={`${(pathName.includes("outbox") || pathName.includes("archive")) && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Inbox
          </Button>
        </LinkWithLoader>
        <LinkWithLoader href={`/engineering/projects/outbox`}>
          <Button
            variant="primary"
            className={`${!pathName.includes("outbox") && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Outbox 
            <div className="badge badge-secondary">({outboxItemCount?.count})</div>
          </Button>
        </LinkWithLoader>

        <LinkWithLoader href={'/engineering/projects/archive'}>
          <Button
            variant="primary"
            className={`${!pathName.includes("archive") && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Archive 
          </Button>
        </LinkWithLoader>
      </div>

      <div className="inline-block w-full mt-4 flex gap-2 justify-center">

        {children}

      </div>


    </>
  );
}