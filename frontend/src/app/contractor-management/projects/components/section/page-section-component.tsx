import React from "react";
import { usePagination } from "@/hooks/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import qs from "qs";
import { FilterButton } from "@/components/global/atoms/FilterButton";
import { UseQueryResult } from "react-query";
import ContractorManagementViewComponent from "./components/details-view/details-view-component";
import { ProjectListComponent } from "./components/list-view-component";
import { ViewModeSelectionButtons } from "./components/view-mode-selection-buttons-component";
import { ContractorManagementSearchPanel } from "./components/search-panel";



interface ContractorManagementPageSectionComponentProps {
    queryHook: (searchQuery: string, limit: number, page: number) => UseQueryResult<any>
}


export const ContractorManagementPageSectionComponent = ({ queryHook }: ContractorManagementPageSectionComponentProps) => {
    const searchParams = useSearchParams();
    const [currentViewMode, setCurrentViewMode] = useState<string>("list");


    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);


    const [limit, page, paginator, resetPaginator] = usePagination();
    const { isFetching, isLoading, data: projectProposalData } = queryHook(searchQuery, limit, page);


    const [selectedProposalId, setSelectedProposalId] = useState<number>();


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



    return (
        <>
            <div className="flex">

                <div className={isFilterPanelOpen ? 'w-[75%]' : 'w-[98%]'}>
                    <section className="border bg-white shadow-xl p-6 px-10">

                        <div className="flex items-center mb-4 justify-between">
                            <ViewModeSelectionButtons currentViewMode={currentViewMode} />

                            {currentViewMode == "list" && (<div className="flex flex-col justify-center">
                                <FilterButton onClick={toggleFilterPanel} active={isFilterPanelOpen} />
                            </div>)}
                        </div>

                        <div>
                            {currentViewMode == "list" && (

                                (isFetching || isLoading) ?
                                    <LoaderSkeleton rowCount={limit} /> :
                                    <>
                                        <ProjectListComponent projectProposalData={projectProposalData} page={page} limit={limit} />
                                        {paginator}
                                    </>

                            )}

                            {currentViewMode == "details" && (
                                <ContractorManagementViewComponent ProProposalId={selectedProposalId} readOnly={false} />
                            )}

                        </div>

                    </section>
                </div>

                <div hidden={!isFilterPanelOpen} className="w-[25%] h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">

                    <ContractorManagementSearchPanel
                        toggleFilterPanel={toggleFilterPanel}
                        projectProposalData={projectProposalData}
                        onFilterChange={onFilterChange}
                        onRemoveFilter={onRemoveFilter}
                    />
                </div>
            </div>


        </>

    );
}
