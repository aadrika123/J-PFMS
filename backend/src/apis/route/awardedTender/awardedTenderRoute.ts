/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tender Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import AwardedTenderController from "../../controller/awardedTender/awardedTenderController";

class AwardedTenderRoute extends APIv1{
  private controller: AwardedTenderController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "awarde/tender");
    this.controller = new AwardedTenderController();
  }

  configure(): void {
    this.addPostRoute('create', this.controller.create);
    this.addGetRoute(`get-by-id/:id`, this.controller.getById);
    this.addGetRoute(`get/:id`, this.controller.get);
    this.addGetRoute(`project-proposal/get/:id`, this.controller.getProjectProposalById);
    this.addPostRoute(`update/:id`, this.controller.update);
    this.addGetRoute(`datasheet`, this.controller.getAllApprovedTendersDatasheet);
  }
}

export default AwardedTenderRoute;
