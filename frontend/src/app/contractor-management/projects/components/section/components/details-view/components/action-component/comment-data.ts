import axios, { baseURL } from "@/lib/axiosConfig";
import { useQuery } from "react-query";


const contractApprovalCommentListAPI = `${baseURL}/contractor-management/get-full-details`;
const CONTRACT_APPROVAL_COMMENT_LIST_QUERY_KEY = contractApprovalCommentListAPI;

export const useContractApprovalCommentList = (proposalId: number) => {
    return useQuery([CONTRACT_APPROVAL_COMMENT_LIST_QUERY_KEY, proposalId], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${contractApprovalCommentListAPI}/${proposalId}`).then(resp => {
          console.log("Comments", resp.data);
          
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
  