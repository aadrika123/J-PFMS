import { baseURL } from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";

export const PROJECT_PROPOSAL_FULLY_APPROVED_API = `${baseURL}/project-verification/fully-approved`;

export const useProjectProposalsFullyApprovedList = (searchQuery: string, limit: number, page: number) => {

    return useQuery([PROJECT_PROPOSAL_FULLY_APPROVED_API, searchQuery, limit, page], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${PROJECT_PROPOSAL_FULLY_APPROVED_API}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
          console.log(resp.data.message);
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
  