"use client";
import React from "react";
import  { useState } from "react";
interface ProposalDetail {
  id: number;
  documents: string;
  views: string;
  status: string;
  remarks: string;
}



const DetailsCards: React.FC = () => {
    const [proposalDetails, setProposalDetails] = useState<ProposalDetail[]>([
      {
        id: 1,
        documents: "Document 1",
        views: "10",
        status: "Approved",
        remarks: "All are fine",
      },
      {
        id: 2,
        documents: "Document 2",
        views: "5",
        status: "Pending",
        remarks: "Needs review",
      },
      // Add more details as needed
    ]);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-200">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
          >
            #
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
          >
            Documents
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
          >
            Views
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
          >
            Remarks
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {proposalDetails.map((detail) => (
          <tr key={detail.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {detail.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {detail.documents}
            </td>
            <td className="px-6 py-4  whitespace-nowrap text-sm ">
              <button className="bg-indigo-700 border h-41 w-41 text-center">{detail.views}</button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {detail.status}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm ">
              {detail.remarks}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ViewDocuments: React.FC = () => {
  return (
    <div className=" mx-auto mt-0 p-4">
      <DetailsCards />
    </div>
  );
};

export default ViewDocuments;
