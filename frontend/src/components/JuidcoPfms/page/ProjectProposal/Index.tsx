"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-05-2024
 * | Created for- Project Proposal
 * | Status- open
 */

"use client"

import { OutboxSectionComponent } from "@/app/engineering/projects/components/sections/outbox-section-component";
import { ReadyForTenderingSectionComponent } from "@/app/engineering/projects/components/sections/ready-for-tendering-section-component";
import { ReceivedBackSectionComponent } from "@/app/engineering/projects/components/sections/received-back-section-component";
import { useProjectProposalsFullyApprovedList } from "@/app/engineering/projects/data-hooks/ready-for-tendering-data";
import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import { LoadingCircleSmall } from "@/components/global/atoms/loading-circles";
import { useProjectProposalList, useProjectProposalsOutboxList, useProjectProposalsReturnedList } from "@/hooks/data/ProjectProposalsHooks";
import { defaultLimit, defaultPage } from "@/hooks/Pagination";
import goBack from "@/utils/helper";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const HeroProjectProposal = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<string>("outbox");

  // It is important to keep these data hooks in order in which we want to seed the data on screen

  const { data: projectProposalOutboxData } = useProjectProposalsOutboxList("", defaultLimit, defaultPage);
  const { data: projectProposalReceivedBackData } = useProjectProposalsReturnedList("", defaultLimit, defaultPage);
  const { data: projectProposalFullyApprovedData } = useProjectProposalsFullyApprovedList("", defaultLimit, defaultPage);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) setCurrentSection(section);
  }, [searchParams]);


  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString())
  //     params.set(name, value)

  //     return params.toString()
  //   },
  //   [searchParams]
  // )


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
      <div className="flex justify-between">
        <div className="flex items-center mb-2 gap-2">
          <Link href={pathName + '?section=outbox'}>
            <Button
              variant="primary"
              className={currentSection == "outbox" ? "" : "bg-gray-200 text-gray-500"}
            >
              {Icons.outbox}
              Outbox
              {projectProposalOutboxData ? (
                <div className="badge badge-secondary">
                  {projectProposalOutboxData?.count}
                </div>
              ) : (
                <LoadingCircleSmall />
              )}

            </Button>
          </Link>


          <Link href={pathName + '?section=returned'}>
            <Button
              variant="primary"
              className={currentSection == "returned" ? "" : "bg-gray-200 text-gray-500"}
            >
              {Icons.outbox}
              Received Back
              {projectProposalReceivedBackData ? (
                <div className="badge badge-secondary">
                  {projectProposalReceivedBackData?.count}
                </div>
              ) : (
                <LoadingCircleSmall />
              )}

            </Button>
          </Link>


          <Link href={pathName + '?section=ready_for_tendering'}>
            <Button
              variant="primary"
              className={currentSection == "ready_for_tendering" ? "" : "bg-gray-200 text-gray-500"}
            >
              {Icons.outbox}
              Ready For Tendering
              {projectProposalFullyApprovedData ? (
                <div className="badge badge-secondary">
                  {projectProposalFullyApprovedData?.count}
                </div>
              ) : (
                <LoadingCircleSmall />
              )}

            </Button>
          </Link>

        </div>

        <div>
          {searchParams.get("proposalId") != null && searchParams.get("section") === "returned"?
          <Button variant="primary"
          onClick={
            () => {
              router.push(`${pathName}/edit/${searchParams.get("proposalId")}?mode=edit`);
            }
          }
          >Edit</Button>:<></>}
        </div>
      </div>

      <div className="w-full mt-4 flex gap-2 justify-center">

        {currentSection === "outbox" && <OutboxSectionComponent />}

        {currentSection === "returned" && <ReceivedBackSectionComponent />}

        {currentSection === "ready_for_tendering" && <ReadyForTenderingSectionComponent />}

      </div>


    </>
  );
}

export default HeroProjectProposal;