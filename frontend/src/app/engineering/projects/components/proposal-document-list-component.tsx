import React, { useState } from "react";
import Table from "@/components/global/molecules/Table";
import pdfIcon from "@/assets/svg/pdf_icon.svg";
import Image from "next/image";
import { useProposalDocumentListData } from "../data-hooks/proposal-document-list-data-hook";
import Popup from "@/components/global/molecules/Popup";
import Button from "@/components/global/atoms/buttons/Button";
import { Icons } from "@/assets/svg/icons";



///////// Get Visibal Image /////
const getVisibleImage = (path: any): any => {
    if (!String(path).includes("https")) {
      return path.name.includes(".pdf") ? (
        Icons.pdf
      ) : (
        <img
          src={URL.createObjectURL(path)}
          height={50}
          width={50}
          alt="t"
          className="max-h-20 w-20 object-cover"
        />
      );
    } else {
      return String(path).includes(".pdf") ? (
        Icons.pdf
      ) : (
        <img
          src={path}
          height={50}
          width={50}
          alt="t"
          className="max-h-20 w-20 object-cover"
        />
      );
    }
  };


interface DocumentPopupViewProps {
    docUrl: string;
    hideAction: () => void;
}

const DocumentPopupView = (props: DocumentPopupViewProps) => {
    return (
        <Popup padding="0">
            <iframe
                width={1000}
                height={570}
                src={props.docUrl}
            ></iframe>
            <div className="flex items-center absolute bottom-3 self-center">
                <Button
                    onClick={() => props.hideAction()}
                    variant="cancel"
                >
                    Close
                </Button>
            </div>
        </Popup>
    );
}



interface ProposalDocumentListComponentProps {
    proposalId: number;
}

export const ProposalDocumentListComponent = ({ proposalId }: ProposalDocumentListComponentProps) => {

    const { data: data } = useProposalDocumentListData(proposalId);
    const [docToViewOnPopup, setDocToViewOnPopup] = useState<string | null>(null);


    /////// View Button
    const ViewButton = (id: number | string) => {
        const doc = data.find((item: any) => item.id === id);
        const handleClick = () => {
            setDocToViewOnPopup(doc?.path);
        };

        return (
            <div onClick={handleClick}>
                {getVisibleImage(doc?.path)}
            </div>
        );
    };


    const columns = [
        { name: "id", caption: "Sr. No.", width: "w-[5%]" },
        {
            name: "description",
            caption: "Description",
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
        <>
            {docToViewOnPopup && (
                <DocumentPopupView docUrl={docToViewOnPopup} hideAction={() => setDocToViewOnPopup(null)} />
            )}

            <div className="mt-4">
                <Table columns={columns} data={data} center />
            </div>
        </>


    );
}

