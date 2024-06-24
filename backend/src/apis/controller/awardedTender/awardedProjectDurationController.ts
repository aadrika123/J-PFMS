/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Project Duration Controller
 */

import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import { awardedTenderValidation } from "pfmslib";
import AwardedProjectDurationDao from "../../dao/awardedTender/awardedProjectDurationsDao";

class AwardedProjectDurationController {
  private dao: AwardedProjectDurationDao;
  constructor() {
    this.dao = new AwardedProjectDurationDao();
  }

  /* Create ro Update Awarded Project Duration */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await awardedTenderValidation.projectDurationsSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

  /* Get Awarded Project Duration By Awarded Tender Id */
  getByAwardedTenderId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.awardedTenderId);

    const data = await this.dao.getByAwardedTenderId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default AwardedProjectDurationController;
