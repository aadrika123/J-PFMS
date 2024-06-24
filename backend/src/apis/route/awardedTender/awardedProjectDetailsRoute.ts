/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Project Details Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import AwardedProjectDetailsController from "../../controller/awardedTender/awardedProjectDetailsController";

class AwardedProjectDetailsRoute extends APIv1 {
  private controller: AwardedProjectDetailsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "awarded/project-details");
    this.controller = new AwardedProjectDetailsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:awardedTenderId`,
      this.controller.getByAwardedTenderId
    );
  }
}

export default AwardedProjectDetailsRoute;
