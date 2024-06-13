/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Work Details Controller
 */

import { Request } from "express";
import TenderWorkDetailsDao from "../../dao/tenderDatasheet/tenderWorkDetailsDao";
import { APIv1Response } from "../../APIv1";
import { tenderWorkDetailsSchema } from "pfmslib";

class TenderWorkDetailsController {
  private dao: TenderWorkDetailsDao;
  constructor() {
    this.dao = new TenderWorkDetailsDao();
  }

   /* Create ro Update Tender Work Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await tenderWorkDetailsSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Tender Work Detail By Tender Datasheet Id */
   getByTenderDatasheetId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.tenderDatasheetId)

    const data = await this.dao.getByTenderDatasheetId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default TenderWorkDetailsController;
