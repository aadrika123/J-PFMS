/**
 * | Author- Sanjiv Kumar
 * | Created On- 23-06-2024
 * | Status- open
 * | Created For- Awarded Project Milestones Controller
 */

import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import { awardedTenderValidation } from "pfmslib";
import AwardedProjectMilestonesDao from "../../dao/awardedTender/awardedProjectMilestonesDao";

class AwardedProjectMilestonesController {
  private dao: AwardedProjectMilestonesDao;
  constructor() {
    this.dao = new AwardedProjectMilestonesDao();
  }

  /* Create ro Update Awarded Project Milestones */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;
    await awardedTenderValidation.awardedMilestoneSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

  /* Get Awarded Project Milestone By Awarded Tender Id */
  getByAwardedTenderId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.awardedTenderId);

    const data = await this.dao.getByAwardedTenderId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default AwardedProjectMilestonesController;
