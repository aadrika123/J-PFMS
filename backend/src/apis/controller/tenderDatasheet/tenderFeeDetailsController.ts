/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Fee Details Controller
 */

import { Request } from "express";
import TenderFeeDetailsDao from "../../dao/tenderDatasheet/tenderFeeDetailsDao";
import { APIv1Response } from "../../APIv1";
import { tenderFeeDetailsSchema } from "pfmslib";

class TenderFeeDetailsController {
  private dao: TenderFeeDetailsDao;
  constructor() {
    this.dao = new TenderFeeDetailsDao();
  }

   /* Create ro Update Tender Fee Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await tenderFeeDetailsSchema.validate(requestData);

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

export default TenderFeeDetailsController;
