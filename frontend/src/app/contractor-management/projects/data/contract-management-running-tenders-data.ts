import { useQuery } from "react-query";
import axios, { baseURL } from "@/lib/axiosConfig";

const contractManagementRunningTendersDataAPI = `${baseURL}/contractor-management/get-running-tenders-data`;
const CONTRACT_MANAGEMENT_RUNNING_TENDERS_DATA_QUERY_KEY = contractManagementRunningTendersDataAPI;

export const useContractManagementRunningTendersData = (searchQuery: string, limit: number, page: number) => {

    return useQuery([CONTRACT_MANAGEMENT_RUNNING_TENDERS_DATA_QUERY_KEY, searchQuery, limit, page], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${contractManagementRunningTendersDataAPI}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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
  
  