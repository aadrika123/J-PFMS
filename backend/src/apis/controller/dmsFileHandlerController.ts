/**
 * | Author- Sanjiv Kumar
 * | Created On- 07-06-2024
 * | Created for- File Upload And Get From DMS
 * | Status- done
 */

import axios from "axios";
import crypto from "crypto";
import FormData from "form-data";
import { Request } from "express";
import { APIv1Response } from "../APIv1";

const dmsUrl = "https://jharkhandegovernance.com/dms/backend/document/upload";
const DMS_GET =
  "https://jharkhandegovernance.com/dms/backend/document/view-by-reference";

class DMSFileHandlerController {
  constructor() {}

  upload = async (req: Request): Promise<APIv1Response> => {
    const file: any = req.file;
    const hashed = crypto
      .createHash("SHA256")
      .update(file?.buffer)
      .digest("hex");

    const formData = new FormData();
    formData.append("file", file?.buffer, file?.mimetype);
    formData.append("tags", file?.originalname.substring(0, 7));

    const headers = {
      "x-digest": hashed,
      token: "8Ufn6Jio6Obv9V7VXeP7gbzHSyRJcKluQOGorAD58qA1IQKYE0",
      folderPathId: 1,
      ...formData.getHeaders(),
    };

    const response = await axios.post(dmsUrl, formData, { headers });

    return {
      status: true,
      code: 200,
      message: "uloaded",
      data: response.data.data,
    };
  };

  getFile = async (req: Request): Promise<APIv1Response> => {
    const headers = {
      token: "8Ufn6Jio6Obv9V7VXeP7gbzHSyRJcKluQOGorAD58qA1IQKYE0",
    };
    const response = await axios.post(
      DMS_GET,
      { referenceNo: req.params.referenceNo },
      { headers }
    );

    return {
      status: true,
      code: 200,
      message: "found",
      data: response.data.data,
    };
  };

  uploadAndGetUrl = async (req: Request): Promise<APIv1Response> => {
    const file: any = req.file;
    const hashed = crypto
      .createHash("SHA256")
      .update(file?.buffer)
      .digest("hex");

    const formData = new FormData();
    formData.append("file", file?.buffer, file?.mimetype);
    formData.append("tags", file?.originalname.substring(0, 7));

    const headers = {
      "x-digest": hashed,
      token: "8Ufn6Jio6Obv9V7VXeP7gbzHSyRJcKluQOGorAD58qA1IQKYE0",
      folderPathId: 1,
      ...formData.getHeaders(),
    };

    const response = await axios.post(dmsUrl, formData, { headers });
    const refNo = response.data.data.ReferenceNo;
    const res = await axios.post(
      DMS_GET,
      { referenceNo: refNo },
      { headers: { token: headers.token } }
    );

    return {
      status: true,
      code: 200,
      message: "uloaded",
      data: res.data.data.fullPath,
    };
  };
}

export default DMSFileHandlerController;
