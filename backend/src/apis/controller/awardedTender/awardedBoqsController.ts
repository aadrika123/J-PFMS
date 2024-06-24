/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tender BOQs
 */

import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import AwardedBoqsDao from "../../dao/awardedTender/awardedBoqsDao";

class AwardedBoqsController {
  private dao: AwardedBoqsDao;
  constructor() {
    this.dao = new AwardedBoqsDao();
  }

   /* Create ro Update Tender Fee Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    console.log(requestData)
    // await awardedTenderValidation..validate(requestData);

    const data = await this.dao.create();

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Awarded Boqs By Awarded Tender Id */
   getByAwardedTenderId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.awardedTenderId)

    const data = await this.dao.getByAwardedTenderId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default AwardedBoqsController;
