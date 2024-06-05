"use client"

import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";
import { useProjectProposalInboxItemCount, useProjectProposalOutboxItemCount } from "@/hooks/data/ProjectProposalsHooks";
import goBack from "@/utils/helper";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useState } from "react";





interface ProjectManagementLayoutProps {
  inboxComponent: ReactNode
  outboxComponent: ReactNode
}

export const ProjectManagementLayout = ({ inboxComponent, outboxComponent }: ProjectManagementLayoutProps) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [currentSection, setCurrentSection] = useState<string>("inbox");

  const { data: outboxItemCount } = useProjectProposalOutboxItemCount();
  const { data: inboxItemCount } = useProjectProposalInboxItemCount();


  useEffect(() => {
    const section = searchParams.get('section');
    if (section) setCurrentSection(section);
  }, [searchParams]);


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )


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
        <Link href={pathName + '?' + createQueryString('section', 'inbox')}>
          <Button
            variant="primary"
            className={currentSection == "inbox" ? "" : "bg-gray-200 text-gray-500"}
          >
            {Icons.outbox}
            Inbox
            <div className="badge badge-secondary">({inboxItemCount?.count})</div>
          </Button>
        </Link>
        <Link href={pathName + '?' + createQueryString('section', 'outbox')}>
          <Button
            variant="primary"
            className={currentSection == "outbox"? "" : "bg-gray-200 text-gray-500"}
          >
            {Icons.outbox}
            Outbox 
            <div className="badge badge-secondary">({outboxItemCount?.count})</div>
          </Button>
        </Link>

        
      </div>

      <div className="inline-block w-full mt-4 flex gap-2 justify-center">

        {currentSection === "inbox" && inboxComponent}
        
        {currentSection === "outbox" && outboxComponent}
        
      </div>


    </>
  );
}