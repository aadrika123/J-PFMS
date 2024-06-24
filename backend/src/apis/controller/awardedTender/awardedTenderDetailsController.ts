/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tender Details Controller
 */

import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import { tenderBidDetailsSchema } from "pfmslib";
import AwardedTenderDetailsDao from "../../dao/awardedTender/awardedTenderDetailsDao";

class AwardedTenderDetailsController {
  private dao: AwardedTenderDetailsDao;
  constructor() {
    this.dao = new AwardedTenderDetailsDao();
  }

    /* Create ro Update Awarded Tender Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await tenderBidDetailsSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Awarded Tender Detail By Awarded Tender Id */
   getByAwardedTenderId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.awardedTenderId)

    const data = await this.dao.getByAwardedTenderId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default AwardedTenderDetailsController;
