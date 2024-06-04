"use client";
/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-05-2024
 * | Created for- Project Proposal
 * | Status- open
 */

import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";
import { usePathname, useRouter } from "next/navigation";

import SimpleTable from "@/components/global/atoms/SimpleTable";

import { useProjectProposalList } from "@/hooks/data/ProjectProposalsHooks";
import { FilterButton } from "@/components/global/atoms/FilterButton";
import qs from "qs";
import { usePagination } from "@/hooks/Pagination";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import SearchPanel from "@/components/global/molecules/SearchPanel";

const HeroProjectProposal = () => {
  const router = useRouter();
  const [, activateWorkingAnimation] = useWorkingAnimation();

  const pathName = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [limit, page, paginator, resetPaginator] = usePagination();

  const { isFetching, isLoading, data: projectProposalData } = useProjectProposalList(searchQuery, limit, page);

  const [projectProposals, setProjectProposals] = useState<[]>();

  const searchPanelItems = [
    { name: "project_proposal_no", caption: "Project Proposal Number" },
    { name: "ulb_name", caption: 'Ulb Name' }
  ];
  const [searchPanelItemValues, setSearchPanelItemValues] = useState<any>({});

  const [totalResults, setTotalResults] = useState<number>();



  const columns = [
    { name: "id", caption: "Sr. No." },
    { name: "title", caption: "Project Title" },
    { name: "type", caption: "Project Type" },
    { name: "proposed_date", caption: "Proposed Date", type: "date" },
    { name: "ward_name", caption: "Ward No" },
    // { name: "summary", caption: "Summary", width: "w-[20%]", align: "left"}
  ];

  const onViewButtonClick = (id: number) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}?mode=view`);
  };


  useEffect(() => {
    console.log(projectProposalData);

    setTotalResults(projectProposalData?.count);

    //update the items for the table
    setProjectProposals(projectProposalData?.records);

    // populate the items to be displayed in the search panel

    let newSearchPanelItemValues = { ...searchPanelItemValues };

    const project_proposal_nos = projectProposalData?.project_proposal_no?.map((item: any) => item.project_proposal_no);
    if (project_proposal_nos) newSearchPanelItemValues = { ...newSearchPanelItemValues, project_proposal_no: project_proposal_nos }


    const ulb_names = projectProposalData?.ulb_name?.map((item: any) => item.ulb_name);
    if (ulb_names) newSearchPanelItemValues = { ...newSearchPanelItemValues, ulb_name: ulb_names }

    setSearchPanelItemValues(newSearchPanelItemValues);

  }, [projectProposalData]);

  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
  const toggleFilterPanel = () => {
    setFilterPanelOpen((prevState) => !prevState);
  }


  const onFilterChange = (filters: any) => {
    // console.log("Filters updated: ", filters);
    const q = qs.stringify(filters);
    setSearchQuery(q);
    resetPaginator();
  }

  const onRemoveFilter = () => {
    console.log("Filters removed!");
    setSearchQuery("");
    resetPaginator();
  }


  return (
    <>
      <HeaderWidget variant="add" title="Project Proposal" />
        {/* <ProjectManagementInboxPage /> */}

        <div className="w-full mt-4 flex gap-2 justify-center">

        <div hidden={!isFilterPanelOpen} className="w-[25%] h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
          <SearchPanel onClose={toggleFilterPanel} items={searchPanelItems} values={searchPanelItemValues} onFilterChange={onFilterChange} onNoFilter={onRemoveFilter} />
        </div>

        <div className={isFilterPanelOpen ? 'w-[75%]' : 'w-[98%]'}>
        <section className="border bg-white shadow-xl p-6 px-10">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex">
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

              <div className="flex flex-col justify-center">
                <FilterButton onClick={toggleFilterPanel} active={isFilterPanelOpen} />
              </div>
            </div>

            Total Results: {totalResults}


            {
              (isFetching || isLoading) ?
                <LoaderSkeleton rowCount={limit} /> :
                <SimpleTable columns={columns} data={projectProposals} onViewButtonClick={onViewButtonClick} rowIndexStart={(page - 1) * limit + 1} />
            }

            {paginator}




          </section>
        </div>

      </div>

        {/* <TableWithFeatures
          center
          columns={columns}
          api={`${PFMS_URL.PROJ_RPOPOSAL_URL.get}`}
          numberOfRowsPerPage={10}
        /> */}
    </>
  );
};

export default HeroProjectProposal;
