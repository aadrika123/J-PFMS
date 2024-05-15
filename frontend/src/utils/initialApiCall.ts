import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "./api/urls";

export const initialApiCall = async () => {
  let result = {};
  const res = await Promise.all([
    axios({
      url: `${PFMS_URL.ULB_URL.getById}/2`,
      method: "GET",
    }),
  ]);

  res.forEach((item) => {
    result = {...result, ...item.data.data}
  })

  return result;
};
