import { useQuery } from "react-query";
import axios, { baseURL } from "@/lib/axiosConfig";

const contractManagementContractDetailsAPI = `${baseURL}/contractor-management/get-full-details`;
const CONTRACT_MANAGEMENT_CONTRACT_DETAILS_DATA = contractManagementContractDetailsAPI;


export const useContractDetailsData = (proposalId: number) => {
    return useQuery([CONTRACT_MANAGEMENT_CONTRACT_DETAILS_DATA, proposalId], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        
        console.log("ProposalId", proposalId);
        if(!proposalId) resolve(undefined);
  
        axios.get(`${contractManagementContractDetailsAPI}?proposalId=${proposalId}`).then(resp => {
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
  