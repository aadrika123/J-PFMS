/**
 * | Author- Sanjiv Kumar
 * | Created On- 23-06-2024
 * | Status- open
 * | Created For- Awarded Project Milestones Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import AwardedProjectMilestonesController from "../../controller/awardedTender/awardedProjectMilestonesController";

class AwardedProjectMilestonesRoute extends APIv1 {
  private controller: AwardedProjectMilestonesController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "awarded/project-milestones");
    this.controller = new AwardedProjectMilestonesController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:awardedTenderId`,
      this.controller.getByAwardedTenderId
    );
  }
}

export default AwardedProjectMilestonesRoute;
