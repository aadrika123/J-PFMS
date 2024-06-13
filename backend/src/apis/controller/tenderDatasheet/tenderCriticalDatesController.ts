/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Critical Dates Controller
 */

import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import { tenderCriticalDateSchema } from "pfmslib";
import TenderCriticalDatesDao from "../../dao/tenderDatasheet/tenderCriticalDatesDao";

class TenderCriticalDatesController {
  private dao: TenderCriticalDatesDao;
  constructor() {
    this.dao = new TenderCriticalDatesDao();
  }

   /* Create ro Update Tender Critical Dates */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await tenderCriticalDateSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Tender Fee Detail By Tender Datasheet Id */
   getByTenderDatasheetId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.tenderDatasheetId)

    const data = await this.dao.getByTenderDatasheetId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default TenderCriticalDatesController;
