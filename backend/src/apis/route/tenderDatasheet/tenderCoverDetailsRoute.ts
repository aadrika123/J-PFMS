/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-06-2024
 * | Status- open
 * | Created For- Tender Cover Details Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderCoverDetailsController from "../../controller/tenderDatasheet/tenderCoverDetailsController";

class TenderCoverDetailsRoute extends APIv1 {
  private controller: TenderCoverDetailsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/cover-details");
    this.controller = new TenderCoverDetailsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:tenderDatasheetId`,
      this.controller.getByTenderDatasheetId
    );
  }
}

export default TenderCoverDetailsRoute;
