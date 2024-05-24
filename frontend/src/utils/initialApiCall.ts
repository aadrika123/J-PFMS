import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "./api/urls";

export const initialApiCall = async (id: number, token: string) => {
  let result = {};
  const res = await Promise.all([
    axios({
      url: `${PFMS_URL.ULB_URL.getById}/${id}`,
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    }),
  ]);

  res.forEach((item) => {
    result = {...result, ...item.data.data}
  })

  return result;
};
