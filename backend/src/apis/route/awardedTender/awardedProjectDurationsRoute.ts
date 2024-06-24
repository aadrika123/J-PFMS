/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Project Duration Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import AwardedProjectDurationController from "../../controller/awardedTender/awardedProjectDurationController";

class AwardedProjectDurationRoute extends APIv1 {
  private controller: AwardedProjectDurationController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "awarded/project-duration");
    this.controller = new AwardedProjectDurationController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:awardedTenderId`,
      this.controller.getByAwardedTenderId
    );
  }
}

export default AwardedProjectDurationRoute;
