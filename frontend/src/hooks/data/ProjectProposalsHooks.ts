import { baseURL } from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import { usePathname } from "next/navigation";



export const PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS = Object.freeze({
  INBOX_LIST: "project-proposals",
  OUTBOX_ITEM_COUNT: "outbox-item-count",
  INBOX_ITEM_COUNT: "inbox-item-count",
  PROPOSAL: "project-proposal"
});


const projectProposalApi = `${baseURL}/project-verification/get`;
const projectProposalsApi = `${baseURL}/project-verification/get-all`;
const projectProposalsInboxApi = `${baseURL}/project-verification/inbox`;
const projectProposalsOutboxApi = `${baseURL}/project-verification/outbox`;
const projectProposalsArchiveApi = `${baseURL}/project-verification/archive`;
const projectProposalAcknowledgementApi = `${baseURL}/project-verification/acknowledge`;
const projectProposalOutboxItemCountApi = `${baseURL}/project-verification/get-outbox-item-count`;
const projectProposalInboxItemCountApi = `${baseURL}/project-verification/get-inbox-item-count`;
const measurementListAPI = `${baseURL}/project-verification/measurements/get`;
const sorListAPI = `${baseURL}/project-verification/schedule-of-rates/get`;

export const useProjectProposalList = (searchQuery: string, limit: number, page: number) => {
  const pathName = usePathname();
  return useQuery([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_LIST, searchQuery, limit, page, pathName], (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios.get(`${projectProposalsApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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
      axios.get(`${projectProposalsInboxApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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
      axios.get(`${projectProposalsOutboxApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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
      axios.get(`${projectProposalsArchiveApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
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


export const useProjectProposalDetails = (proposalId: number) => {
  const pathName = usePathname();
  return useQuery([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.PROPOSAL, proposalId, pathName], (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios.get(`${projectProposalApi}/${proposalId}`).then(resp => {
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



interface ItemCountAPIResponse {
  count: number;
}

export const useProjectProposalOutboxItemCount = () => {
  const pathName = usePathname();
  return useQuery([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.OUTBOX_ITEM_COUNT, pathName], (): Promise<ItemCountAPIResponse> => {
    return new Promise((resolve, reject) => {
      axios.get(`${projectProposalOutboxItemCountApi}`).then(resp => {
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


export const useProjectProposalInboxItemCount = () => {
  const pathName = usePathname();
  return useQuery([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_ITEM_COUNT, pathName], (): Promise<ItemCountAPIResponse> => {
    return new Promise((resolve, reject) => {
      axios.get(`${projectProposalInboxItemCountApi}`).then(resp => {
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


export const useMeasurementList = (proposalId: number, searchQuery: string, limit: number, page: number) => {
  return useQuery(["measurements", proposalId, searchQuery, limit, page], (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios.get(`${measurementListAPI}?proposal_id=${proposalId}&limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ''}`).then(resp => {
        console.log(resp.data);
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

export const useSORList = (search: string) => {
  return useQuery(["sor-list", search], (): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios.get(`${sorListAPI}${search && search.length > 0 ? `?search=${search}` : ''}`).then(resp => {
        console.log(resp.data);
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


export const acknowledgeProposal = (proposalId: number) => {
  return new Promise((resolve, reject) => {
    axios.post(`${projectProposalAcknowledgementApi}/${proposalId}`).then(resp => {
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
}





export const useUlbList = () => {
  return {
    data: [
      { id: 1, caption: "Chasnagar" },
      { id: 2, caption: "Ranchi" }
    ]
  };
}

export const useFinYearList = () => {
  return {
    data: [
      { id: 2024, name: "2023-2024" },
      { id: 2023, name: "2022-2023" }
    ]
  };
}


