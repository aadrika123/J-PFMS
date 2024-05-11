import { baseURL } from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import { usePathname } from "next/navigation";




const projectProposalsApi = `${baseURL}/project-management/get`;
const projectProposalsInboxApi = `${baseURL}/project-management/inbox`;
const projectProposalsOutboxApi = `${baseURL}/project-management/outbox`;
const projectProposalsArchiveApi = `${baseURL}/project-management/archive`;


export const useProjectProposalList = (searchQuery: string, limit: number, page: number) => {
  const pathName = usePathname();
    return useQuery(["project-proposals", searchQuery, limit, page, pathName], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${projectProposalsApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length>0?`&${searchQuery}`:''}`).then(resp => {
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


  export const useProjectProposalsInboxList = (searchQuery: string, limit: number, page: number) => {
    const pathName = usePathname();

    return useQuery(["project-proposals", searchQuery, limit, page, pathName], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${projectProposalsInboxApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length>0?`&${searchQuery}`:''}`).then(resp => {
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


  export const useProjectProposalsOutboxList = (searchQuery: string, limit: number, page: number) => {
    const pathName = usePathname();

    return useQuery(["project-proposals", searchQuery, limit, page, pathName], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${projectProposalsOutboxApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length>0?`&${searchQuery}`:''}`).then(resp => {
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


  export const useProjectProposalsArchiveList = (searchQuery: string, limit: number, page: number) => {
    const pathName = usePathname();

    return useQuery(["project-proposals", searchQuery, limit, page, pathName], (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get(`${projectProposalsArchiveApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length>0?`&${searchQuery}`:''}`).then(resp => {
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


  export const useUlbList = () => {
    return {data: [
      { id: 1, caption: "Chasnagar" },
      { id: 2, caption: "Ranchi" }
    ]};
  }

  export const useFinYearList = () => {
    return {data: [
      { id: 2024, name: "2023-2024" },
      { id: 2023, name: "2022-2023" }
    ]};
  }