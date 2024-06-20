import React from "react";
import { ProjectProposalPageSectionComponent } from "./section-component";
import { useProjectProposalsReturnedList } from "@/hooks/data/ProjectProposalsHooks";


export const ReceivedBackSectionComponent = () => {
    return (
        <ProjectProposalPageSectionComponent queryHook={useProjectProposalsReturnedList}/>

    );
}