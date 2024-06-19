import React from "react";
import { usePagination } from "@/hooks/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import SearchPanel from "@/components/global/molecules/SearchPanel";
import Link from "next/link";
import Image from "next/image";
import listSVG from "@/assets/svg/list.svg";
import detailsSVG from "@/assets/svg/details.svg";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import SimpleTable from "@/components/global/atoms/SimpleTable";
import ProjectApprovalViewComponent from "../ProjectApprovalViewComponent";
import qs from "qs";
import { FilterButton } from "@/components/global/atoms/FilterButton";
import { useProjectProposalsOutboxList } from "@/hooks/data/ProjectProposalsHooks";

export const OutboxComponent = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
    const [currentViewMode, setCurrentViewMode] = useState<string>("list");


    const [searchQuery, setSearchQuery] = useState<string>("");
    const [limit, page, paginator, resetPaginator] = usePagination();
    const { isFetching, isLoading, data: projectProposalData } = useProjectProposalsOutboxList(searchQuery, limit, page);

    const [projectProposals, setProjectProposals] = useState<[]>();
    const [searchPanelItemValues, setSearchPanelItemValues] = useState<any>({});
    const [totalResults, setTotalResults] = useState<number>();

    const [selectedProposalId, setSelectedProposalId] = useState<number>();

    const createQueryString = useCallback(
        (newParams: any) => {
            const params = new URLSearchParams(searchParams.toString())

            const keys = Object.keys(newParams);
            keys.forEach((key) => {
                params.set(key, newParams[key])
            });
            return params.toString()
        },
        [searchParams]
    )


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


    const searchPanelItems = [
        { name: "project_proposal_no", caption: "Project Proposal Number" },
        { name: "ulb_name", caption: 'Ulb Name' }
    ];



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


    useEffect(() => {
        const viewMode = searchParams.get('viewMode');
        if (viewMode) setCurrentViewMode(viewMode);

        const proposalId = searchParams.get("proposalId");
        if (proposalId) setSelectedProposalId(Number(proposalId));

    }, [searchParams]);


    const columns = [
        // { name: "id", caption: "Sr. No.", width: "w-[5%]" },
        // { name: "date", caption: "Date", width: "w-[20%]", type: "date" },
        // { name: "ulb_name", caption: "Ulb Name", width: "w-[20%]" },
        // { name: "summary", caption: "Summary", width: "w-[20%]", align: "left" }
        { name: "id", caption: "Sr. No." },
        { name: "project_proposal_no", caption: "Project Proposal No.", width: "w-[20%]" },
        { name: "title", caption: "Project Title" },
        { name: "type", caption: "Project Type" },
        { name: "proposed_date", caption: "Proposed Date", type: "date" },
        { name: "ward_name", caption: "Ward No" },
    ];


    const onViewButtonClick = (id: number) => {
        router.push(pathName + '?' + createQueryString({ viewMode: 'details', proposalId: id }));
    };

    return (
        <>
            <div hidden={!isFilterPanelOpen} className="w-[25%] h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
                <SearchPanel onClose={toggleFilterPanel} items={searchPanelItems} values={searchPanelItemValues} onFilterChange={onFilterChange} onNoFilter={onRemoveFilter} />
            </div>

            <div className={isFilterPanelOpen ? 'w-[75%]' : 'w-[98%]'}>
                <section className="border bg-white shadow-xl p-6 px-10">



                    <div className="flex items-center mb-4 justify-between">
                        <div className="flex">

                            <Link href={pathName + `?section=${searchParams.get('section') ? searchParams.get('section') : "inbox"}&viewMode=list`}>
                                <div
                                    className={currentViewMode === "list" ? `flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black` :
                                        `flex items-center  pb-1 w-28 justify-center`
                                    }
                                >
                                    <Image src={listSVG} height={20} width={20} alt="pro-1" />
                                    <span className="ml-2 text-gray-500">List</span>
                                </div>
                            </Link>


                            <div className={currentViewMode === "details" ? `flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black` :
                                `flex items-center  pb-1 w-28 justify-center`
                            }>
                                <Image src={detailsSVG} height={20} width={20} alt="pro-1" />
                                <span className="ml-2 text-gray-500">Details</span>
                            </div>
                        </div>

                        {currentViewMode == "list" && (<div className="flex flex-col justify-center">
                            <FilterButton onClick={toggleFilterPanel} active={isFilterPanelOpen} />
                        </div>)}
                    </div>

                    {currentViewMode == "list" && (
                        <div>

                            Total Results: {totalResults}


                            {
                                (isFetching || isLoading) ?
                                    <LoaderSkeleton rowCount={limit} /> :
                                    <SimpleTable columns={columns} data={projectProposals} onViewButtonClick={onViewButtonClick} rowIndexStart={(page - 1) * limit + 1} />
                            }

                            {paginator}

                        </div>
                    )}

                    {
                        currentViewMode == "details" && (
                            <div>
                                <ProjectApprovalViewComponent ProProposalId={selectedProposalId} readOnly={true} />

                            </div>
                        )
                    }


                </section>
            </div>



        </>

    );
}
