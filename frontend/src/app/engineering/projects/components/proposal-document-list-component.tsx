import React from "react";
import Table from "@/components/global/molecules/Table";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import Image from "next/image";
import { useProposalDocumentListData } from "../data-hooks/proposal-document-list-data-hook";





interface ProposalDocumentListComponentProps {
    proposalId: number;
}

export const ProposalDocumentListComponent = ({ proposalId }: ProposalDocumentListComponentProps) => {
    
    const {data: data} = useProposalDocumentListData(proposalId);

    /////// View Button
    const ViewButton = (id: number | string) => {
        const doc = data.find((item: any) => item.id === id);
        const handleClick = () => {
            // setState((prev: any) => ({
            //   ...prev,
            //   showPopup: !showPopup,
            //   docData: doc,
            // }));
        };

        return (
            <div onClick={handleClick}>
                {doc?.path.split(".")[1] !== "pdf" ? (
                    <img
                        className="w-12 h-12"
                        src={`${process.env.img_base}${doc?.path}`}
                        alt=""
                    />
                ) : (
                    <Image src={pdfIcon} width={30} height={30} alt="pdf-icon" />
                )}
            </div>
        );
    };


    const columns = [
        { name: "id", caption: "Sr. No.", width: "w-[5%]" },
        {
            name: "file_name",
            caption: "Document Name",
        },
        {
            name: "path",
            caption: "View",
            value: ViewButton,
        },
        {
            name: "approved",
            caption: "Status",
        },
        {
            name: "remarks",
            caption: "Remarks",
        },
    ];


    return (
        <div className="mt-4">
            <Table columns={columns} data={data} center />
        </div>
    );
}

