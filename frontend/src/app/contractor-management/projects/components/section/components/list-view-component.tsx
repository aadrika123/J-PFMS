import React, { useEffect, useState } from "react";
import SimpleTable from "@/components/global/atoms/SimpleTable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


interface ProjectListComponentProps{
    projectProposalData: any;
    page: number,
    limit: number
}

export const ProjectListComponent = ({projectProposalData, page, limit}: ProjectListComponentProps) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();

    const [projectProposals, setProjectProposals] = useState<[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);


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
    );


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


    useEffect(() => {
        console.log(projectProposalData);

        setTotalResults(projectProposalData?.count);

        //update the items for the table
        setProjectProposals(projectProposalData?.records);

    }, [projectProposalData]);

    return (
        <div>

            Total Results: {totalResults}


            {

                <SimpleTable columns={columns} data={projectProposals} onViewButtonClick={onViewButtonClick} rowIndexStart={(page - 1) * limit + 1} />
            }


        </div>
    );
}
