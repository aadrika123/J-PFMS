/**
 * | Author- Sanjiv Kumar
 * | Created On- 23-06-2024
 * | Status- open
 * | Created For- Awarded Boqs Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import AwardedBoqsController from "../../controller/awardedTender/awardedBoqsController";

class AwardedBoqsRoute extends APIv1 {
  private controller: AwardedBoqsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/critical-dates");
    this.controller = new AwardedBoqsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:awardedTenderId`,
      this.controller.getByAwardedTenderId
    );
  }
}

export default AwardedBoqsRoute;
