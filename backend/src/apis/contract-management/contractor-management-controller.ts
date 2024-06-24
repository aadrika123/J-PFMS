import { APIv1Response } from "../APIv1";
import { Request } from "express";
import { ContractorManagementDao } from "./contractor-management-dao";



/*
  Created By: Bijoy
  Status: Open
*/


export class ContractorManagementController {
  private dao: ContractorManagementDao;
  constructor() {
    this.dao = new ContractorManagementDao();
  }

  getInboxData = async (req: Request): Promise<APIv1Response> => {
    const data = await this.dao.getInboxData(1);
    const result = { status: true, code: 200, message: "Found", data: data };
    return result
  }

  getFullDetails = async (req: Request): Promise<APIv1Response> => {
    const data = await this.dao.getFullDetails(1);
    const result = {status: true, code: 200, message: "Found", data: data};
    return result;
  }
}

