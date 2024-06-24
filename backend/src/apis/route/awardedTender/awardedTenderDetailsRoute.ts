/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tender Details Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import AwardedTenderDetailsController from "../../controller/awardedTender/awardedTenderDetailsController";

class AwardedTenderDetailsRoute extends APIv1 {
  private controller: AwardedTenderDetailsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "awarded/tender-details");
    this.controller = new AwardedTenderDetailsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:awardedTenderId`,
      this.controller.getByAwardedTenderId
    );
  }
}

export default AwardedTenderDetailsRoute;
