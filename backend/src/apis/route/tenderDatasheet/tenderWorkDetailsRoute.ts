/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Work Details Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderWorkDetailsController from "../../controller/tenderDatasheet/tenderWorkDetailsController";

class TenderWorkDetailsRoute extends APIv1 {
  private controller: TenderWorkDetailsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/work-details");
    this.controller = new TenderWorkDetailsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:tenderDatasheetId`,
      this.controller.getByTenderDatasheetId
    );
  }
}

export default TenderWorkDetailsRoute;
