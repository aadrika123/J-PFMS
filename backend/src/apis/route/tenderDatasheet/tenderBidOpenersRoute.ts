/**
 * | Author- Sanjiv Kumar
 * | Created On- 07-06-2024
 * | Status- open
 * | Created For- Tender Bid Openers Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderBidOpenersController from "../../controller/tenderDatasheet/tenderBidOpenersController";

class TenderBidOpenersRoute extends APIv1 {
  private controller: TenderBidOpenersController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/bid-openers");
    this.controller = new TenderBidOpenersController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:tenderDatasheetId`,
      this.controller.getByTenderDatasheetId
    );
  }
}

export default TenderBidOpenersRoute;
