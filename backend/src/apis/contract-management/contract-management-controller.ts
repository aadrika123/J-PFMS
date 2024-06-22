import { APIv1Response } from "../APIv1";
import { Request } from "express";
import * as Yup from "yup";
import ContractManagementDao from "./contract-management-dao";



/*
  Created By: Bijoy
  Status: Open
*/


class ContractManagementController {
  private dao: ContractManagementDao;
  constructor() {
    this.dao = new ContractManagementDao();
  }

  getInboxData = async (req: Request): Promise<APIv1Response> => {
    const data = this.dao.getInboxData(1);
    const result = { status: true, code: 200, message: "Found", data: data };
    return result
  }
}

export default ContractManagementController;