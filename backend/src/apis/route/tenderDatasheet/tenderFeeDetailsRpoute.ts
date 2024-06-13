/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Fee Details Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderFeeDetailsController from "../../controller/tenderDatasheet/tenderFeeDetailsController";

class TenderFeeDetailsRoute extends APIv1 {
  private controller: TenderFeeDetailsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/fee-details");
    this.controller = new TenderFeeDetailsController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:tenderDatasheetId`,
      this.controller.getByTenderDatasheetId
    );
  }
}

export default TenderFeeDetailsRoute;
