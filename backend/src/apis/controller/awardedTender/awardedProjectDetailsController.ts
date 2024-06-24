/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Project Details Controller
 */
import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import { awardedTenderValidation } from "pfmslib";
import AwardedProjectDetailsDao from "../../dao/awardedTender/awardedProjectDetailsDao";

class AwardedProjectDetailsController {
  private dao: AwardedProjectDetailsDao;
  constructor() {
    this.dao = new AwardedProjectDetailsDao();
  }

   /* Create ro Update Awarded Project Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;

    await awardedTenderValidation.projectDetailsSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Awarded Project Detail By Awarded Tender Id */
   getByAwardedTenderId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.awardedTenderId)

    const data = await this.dao.getByAwardedTenderId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default AwardedProjectDetailsController;
