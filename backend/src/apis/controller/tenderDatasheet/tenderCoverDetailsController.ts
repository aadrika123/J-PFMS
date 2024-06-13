/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-06-2024
 * | Status- open
 * | Created For- Tender Cover Details Controller
 */

import { Request } from "express";
import TenderCoverDetailsDao from "../../dao/tenderDatasheet/tenderCoverDetailsDao";
import { APIv1Response } from "../../APIv1";
import { tenderCoverDetailsSchema } from "pfmslib";

class TenderCoverDetailsController {
  private dao: TenderCoverDetailsDao;
  constructor() {
    this.dao = new TenderCoverDetailsDao();
  }

   /* Create ro Update Tender Cover Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await tenderCoverDetailsSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Tender Cover Detail By Tender Datasheet Id */
   getByTenderDatasheetId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.tenderDatasheetId)

    const data = await this.dao.getByTenderDatasheetId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default TenderCoverDetailsController;
