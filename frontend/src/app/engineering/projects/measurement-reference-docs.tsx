import React from "react";
import { useQuery } from "react-query";
import axios, { baseURL } from '@/lib/axiosConfig';
import Button from "@/components/global/atoms/buttons/Button";


const measurementReferenceDocListAPI = `${baseURL}/project-verification/measurements/ref-doc-list`;


interface MeasurementReferenceDocAPIResponse {
    doc_url: string;
}

export const useMeasurementReferenceDocList = (proposalId: string) => {
    return useQuery([measurementReferenceDocListAPI, proposalId], (): Promise<MeasurementReferenceDocAPIResponse[]> => {
        return new Promise((resolve, reject) => {
            axios.get(`${measurementReferenceDocListAPI}?proposalId=${proposalId}`).then(resp => {
                console.log("dicList: ", resp.data);
                if (!resp.data.status) {
                    reject(resp.data.message);
                } else {
                    resolve(resp.data.data);
                }
            }).catch((reason) => {
                reject(reason);
            });
        });
    });
}


interface MeasurementReferenceDocs {
    proposalId: string;
}


const MeasurementReferenceDocs = ({ proposalId }: MeasurementReferenceDocs) => {
    const { data: docList } = useMeasurementReferenceDocList(proposalId);
    return (
        <>
            <div>
                <div className="pt-10 border-b">
                    Reference Docs
                </div>
                <div>
                    {docList && docList.length > 0 && docList.map((doc, index: number) => {
                        const docName = `doc${index + 1}`;
                        return (
                            <div key={index}>
                                <div className="flex gap-2 mt-6 items-center">
                                    <Button variant="primary">{docName}</Button>
                                    <a href={doc.doc_url} target="_blank" rel="noreferrer">
                                        <Button variant="primary">View</Button>
                                    </a>

                                    <a href={doc.doc_url} download={docName}>
                                        <Button variant="primary">Download</Button>
                                    </a>

                                </div> 
                            </div>
                        )
                    }
                    )}
                </div>

            </div>
        </>
    );
}

export default MeasurementReferenceDocs;