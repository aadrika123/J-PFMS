import { baseURL } from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import { usePathname } from "next/navigation";

const projectProposalsTenderApi = `${baseURL}/tender/datasheet/inbox`;
const projectProposalsTenderOutboxApi = `${baseURL}/tender/datasheet/outbox`;
const projectProposalsTenderRejectedApi = `${baseURL}/tender/datasheet/rejected`;
const commentListAPI = `${baseURL}/tender/datasheet/comments`;

export const useProjectProposalTenderList = (
  searchQuery: string,
  limit: number,
  page: number
) => {
  const pathName = usePathname();
  return useQuery(
    ["project-proposals-tender", searchQuery, limit, page, pathName],
    (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${projectProposalsTenderApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ""}`
          )
          .then((resp) => {
            console.log(resp.data.message);
            if (!resp.data.status) {
              reject(resp.data.message);
            } else {
              resolve(resp.data.data);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    }
  );
};

export const useProjectProposalTenderOutboxList = (
  searchQuery: string,
  limit: number,
  page: number
) => {
  const pathName = usePathname();
  return useQuery(
    ["project-proposals-outbox-tender", searchQuery, limit, page, pathName],
    (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${projectProposalsTenderOutboxApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ""}`
          )
          .then((resp) => {
            console.log(resp.data.message);
            if (!resp.data.status) {
              reject(resp.data.message);
            } else {
              resolve(resp.data.data);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    }
  );
};

export const useProjectProposalTenderRejectedList = (
  searchQuery: string,
  limit: number,
  page: number
) => {
  const pathName = usePathname();
  return useQuery(
    ["project-proposals-rejected-tender", searchQuery, limit, page, pathName],
    (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${projectProposalsTenderRejectedApi}?limit=${limit}&page=${page}&order=-1&${searchQuery && searchQuery.length > 0 ? `&${searchQuery}` : ""}`
          )
          .then((resp) => {
            console.log(resp.data.message);
            if (!resp.data.status) {
              reject(resp.data.message);
            } else {
              resolve(resp.data.data);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    }
  );
};

export const useActionCommentList = (proposalId: number) => {
  const pathName = usePathname();
  return useQuery(
    ["tender-form-approval-comment", proposalId, pathName],
    (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios
          .get(`${commentListAPI}/${proposalId}`)
          .then((resp) => {
            if (!resp.data.status) {
              reject(resp.data.message);
            } else {
              resolve(resp.data.data);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    }
  );
};
