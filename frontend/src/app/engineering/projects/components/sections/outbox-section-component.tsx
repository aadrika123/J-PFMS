import React from "react";
import { ProjectProposalPageSectionComponent } from "./section-component";
import { useProjectProposalsOutboxList } from "@/hooks/data/ProjectProposalsHooks";


export const OutboxSectionComponent = () => {
    return (
        <ProjectProposalPageSectionComponent queryHook={useProjectProposalsOutboxList}/>

    );
}