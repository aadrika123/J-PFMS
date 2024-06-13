/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Critical Dates Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderCriticalDatesController from "../../controller/tenderDatasheet/tenderCriticalDatesController";

class TenderCriticalDatesRoute extends APIv1 {
  private controller: TenderCriticalDatesController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/critical-dates");
    this.controller = new TenderCriticalDatesController();
  }

  configure(): void {
    this.addPostRoute("create", this.controller.create);
    this.addGetRoute(
      `get/:tenderDatasheetId`,
      this.controller.getByTenderDatasheetId
    );
  }
}

export default TenderCriticalDatesRoute;
