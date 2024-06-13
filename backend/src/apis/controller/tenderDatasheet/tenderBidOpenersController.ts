/**
 * | Author- Sanjiv Kumar
 * | Created On- 07-06-2024
 * | Status- open
 * | Created For- Tender Bid Openers Controller
 */

import { Request } from "express";
import TenderBidOpenersDao from "../../dao/tenderDatasheet/tenderBidOpenersDao";
import { APIv1Response } from "../../APIv1";
import { tenderBidDetailsSchema } from "pfmslib";

class TenderBidOpenersController {
  private dao: TenderBidOpenersDao;
  constructor() {
    this.dao = new TenderBidOpenersDao();
  }

   /* Create ro Update Tender Bid Openers */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await tenderBidDetailsSchema.validate(requestData);

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

export default TenderBidOpenersController;
