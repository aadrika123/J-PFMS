"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";
import { usePathname } from "next/navigation";

import PageLayout from "@/components/Layouts/PageLayout";
import SimpleTable from "@/components/global/atoms/SimpleTable";

import { useProjectProposalList, useUlbList } from "@/hooks/data/ProjectProposalsHooks";
import StandaloneDropdownList from "@/components/global/atoms/StandAloneDropDownList";
import { FilterButton } from "@/components/global/atoms/FilterButton";


import Button from "@/components/global/atoms/Button";
import goBack from "@/utils/helper";
import { Icons } from "@/assets/svg/icons";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";
import SearchPanel from "./SearchPanel";
import qs from "qs";
import { usePagination } from "@/hooks/Pagination";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";



const page = () => {

  const pathname = usePathname();

  const { data: ulbList } = useUlbList();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [limit, page, paginator] = usePagination();

  const { isFetching, isLoading, data: projectProposalData } = useProjectProposalList(searchQuery, limit, page);

  const [projectProposals, setProjectProposals] = useState<[]>();

  const searchPanelItems = [{ name: "project_proposal_no", caption: "Project Proposal Number" },];
  const [searchPanelItemValues, setSearchPanelItemValues] = useState<any>({});

  const [totalResults, setTotalResults] = useState<number>();



  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "project_proposal_no", caption: "Project Proposal No.", width: "w-[20%]" },
    { name: "date", caption: "Date", width: "w-[20%]", type: "date" },
  ];

  const onViewButtonClick = (id: number) => {
    console.log("View button click for id: ", id);
  };


  useEffect(() => {
    console.log(projectProposalData);

    setTotalResults(projectProposalData?.count);

    //update the items for the table
    setProjectProposals(projectProposalData?.records);

    // populate the items to be displayed in the search panel
    const project_proposal_nos = projectProposalData?.project_proposal_no?.map((item: any) => item.project_proposal_no);
    if (project_proposal_nos) setSearchPanelItemValues({ ...searchPanelItemValues, project_proposal_no: project_proposal_nos });


  }, [projectProposalData]);



  const onUlbChange = () => {
  }


  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => {
    setFilterPanelOpen((prevState) => !prevState);
  }


  const onFilterChange = (filters: any) => {
    // console.log("Filters updated: ", filters);
    const q = qs.stringify(filters);
    setSearchQuery(q);
  }

  const onRemoveFilter = () => {
    console.log("Filters removed!");
    setSearchQuery("");
  }


  return (
    <PageLayout>


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
        <LinkWithLoader href={`${pathname.includes('bills-verify/view') ? '/bills-verify/outbox' : pathname + '/outbox'}`}>
          <Button
            variant="primary"
            className={`${!pathname.includes("outbox") && "bg-gray-200 text-gray-500"}`}
          >
            {Icons.outbox}
            Outbox
          </Button>
        </LinkWithLoader>
      </div>

      <div className="inline-block w-full mt-10 flex gap-2 justify-center">

        <div hidden={!isFilterPanelOpen} className="w-[25%] h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
          <SearchPanel onClose={toggleFilterPanel} items={searchPanelItems} values={searchPanelItemValues} onFilterChange={onFilterChange} onNoFilter={onRemoveFilter} />
        </div>

        <div className={isFilterPanelOpen ? 'w-[75%]' : 'w-[98%]'}>
          <section className="border bg-white shadow-xl p-6 px-10">
            <div className="flex items-center mb-4">
              <div
                className={`flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black`}
              >
                <Image src={list} height={20} width={20} alt="pro-1" />
                <span className="ml-2 text-gray-500">List</span>
              </div>
              <div className={`flex items-center  pb-1 w-28 justify-center`}>
                <Image src={details} height={20} width={20} alt="pro-1" />
                <span className="ml-2 text-gray-500">Details</span>
              </div>
            </div>

            <div className="flex justify-between px-10 mb-10">
              <div className="flex gap-2">
                <StandaloneDropdownList label="ULB" name="ulb" value={2} onChange={onUlbChange} items={ulbList} />
              </div>
              <div className="flex flex-col justify-center">
                <FilterButton onClick={toggleFilterPanel} active={isFilterPanelOpen}/>
              </div>
            </div>

            Total Results: {totalResults}


            {
            (isFetching || isLoading) ?
            <LoaderSkeleton rowCount={limit}/>:
            <SimpleTable columns={columns} data={projectProposals} onViewButtonClick={onViewButtonClick} />
            }




            {paginator}




          </section>
        </div>

      </div>



    </PageLayout>
  );
};

export default page;
