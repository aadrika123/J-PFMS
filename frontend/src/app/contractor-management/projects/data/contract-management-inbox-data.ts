import { useQuery } from "react-query";
import axios, { baseURL } from "@/lib/axiosConfig";

const contractManagementInboxDataAPI = `${baseURL}/contract-management/get-inbox-data`;
const CONTRACT_MANAGEMENT_INBOX_DATA_QUERY_KEY = contractManagementInboxDataAPI;

export const useContractManagementInboxData = (searchQuery: string, limit: number, page: number) => {

    return useQuery([CONTRACT_MANAGEMENT_INBOX_DATA_QUERY_KEY, searchQuery, limit, page], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${contractManagementInboxDataAPI}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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
  
  