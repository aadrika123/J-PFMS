import { baseURL } from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";

export const PROJECT_PROPOSAL_DOCUMENTS_API = `${baseURL}/project-verification/documents/get-list`;

export const useProposalDocumentListData = (proposalId: number) => {

  return useQuery(
    
    [PROJECT_PROPOSAL_DOCUMENTS_API],

    async () => {
      const resp = await axios.get(`${PROJECT_PROPOSAL_DOCUMENTS_API}?proposalId=${proposalId}`);
      console.log("document list data", resp.data);
      if (!resp.data.status) throw new Error(resp.data.message);
      return resp.data.data;
    });
}
