/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-06-2024
 * | Status- open
 * | Created For- Tender Basic Details Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderBasicDetailsController from "../../controller/tenderDatasheet/tenderBasicDetailsController";

class TenderBasicDetailsRoute extends APIv1 {
  private controller: TenderBasicDetailsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/basic-details");
    this.controller = new TenderBasicDetailsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:tenderDatasheetId`,
      this.controller.getByTenderDatasheetId
    );
  }
}

export default TenderBasicDetailsRoute;
