import React, { useEffect, useState } from "react";
import SearchPanel from "@/components/global/molecules/SearchPanel";


interface ContractorManagementSearchPanelProps {
    projectProposalData: any;
    toggleFilterPanel: () => void;
    onFilterChange: (filters: any) => void;
    onRemoveFilter: () => void;
}

export const ContractorManagementSearchPanel = ({ projectProposalData, toggleFilterPanel, onFilterChange, onRemoveFilter }: ContractorManagementSearchPanelProps) => {
    const [searchPanelItemValues, setSearchPanelItemValues] = useState<any>({});

    const searchPanelItems = [
        { name: "project_proposal_no", caption: "Project Proposal Number" },
        { name: "ulb_name", caption: 'Ulb Name' }
    ];


    useEffect(() => {

        // populate the items to be displayed in the search panel
        let newSearchPanelItemValues = { ...searchPanelItemValues };

        const project_proposal_nos = projectProposalData?.project_proposal_no?.map((item: any) => item.project_proposal_no);
        if (project_proposal_nos) newSearchPanelItemValues = { ...newSearchPanelItemValues, project_proposal_no: project_proposal_nos }


        const ulb_names = projectProposalData?.ulb_name?.map((item: any) => item.ulb_name);
        if (ulb_names) newSearchPanelItemValues = { ...newSearchPanelItemValues, ulb_name: ulb_names }

        setSearchPanelItemValues(newSearchPanelItemValues);

    }, [projectProposalData]);

    return (
        <SearchPanel
            onClose={toggleFilterPanel}
            items={searchPanelItems}
            values={searchPanelItemValues}
            onFilterChange={onFilterChange}
            onNoFilter={onRemoveFilter}
        />
    );
}
