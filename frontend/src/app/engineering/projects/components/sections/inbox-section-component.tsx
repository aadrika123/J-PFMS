import React from "react";
import { ProjectProposalPageSectionComponent } from "./section-component";
import { useProjectProposalsInboxList } from "@/hooks/data/ProjectProposalsHooks";


export const InboxSectionComponent = () => {
    return (
        <ProjectProposalPageSectionComponent queryHook={useProjectProposalsInboxList}/>

    );
}