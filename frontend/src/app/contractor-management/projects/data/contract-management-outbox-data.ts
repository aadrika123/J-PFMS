import { useQuery } from "react-query";
import axios, { baseURL } from "@/lib/axiosConfig";

const contractManagementOutboxDataAPI = `${baseURL}/contractor-management/get-outbox-data`;
const CONTRACT_MANAGEMENT_OUTBOX_DATA_QUERY_KEY = contractManagementOutboxDataAPI;

export const useContractManagementOutboxData = (searchQuery: string, limit: number, page: number) => {

    return useQuery([CONTRACT_MANAGEMENT_OUTBOX_DATA_QUERY_KEY, searchQuery, limit, page], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${contractManagementOutboxDataAPI}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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
  
  