import React from "react";
import { ProjectProposalPageSectionComponent } from "./section-component";
import { useProjectProposalsFullyApprovedList } from "../../data-hooks/ready-for-tendering-data";





export const ReadyForTenderingSectionComponent = () => {
    return (
        <ProjectProposalPageSectionComponent queryHook={useProjectProposalsFullyApprovedList}/>
    );
}