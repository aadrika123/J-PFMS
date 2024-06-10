/**
 * | Author- Sanjiv Kumar
 * | Created On- 07-06-2024
 * | Created for- File Upload And Get From DMS
 * | Status- done
 */

import axios from "@/lib/axiosConfig";

export async function upload(file: any) {
  try {
    const formData = new FormData();
    formData.append("doc", file);
    const res = await axios({
      url: "dms/file/upload/and-get",
      method: "POST",
      data: formData,
    });

    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
}
