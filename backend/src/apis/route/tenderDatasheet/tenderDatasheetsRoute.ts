/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-06-2024
 * | Status- open
 * | Created For- Tender Datasheet Router
 */

import express from "express";
import { APIv1 } from "../../APIv1";
import TenderDatasheetsController from "../../controller/tenderDatasheet/tenderDatasheetController";

class TenderDatasheetsRoute extends APIv1{
  private controller: TenderDatasheetsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "tender/datasheet");
    this.controller = new TenderDatasheetsController();
  }

  configure(): void {
    this.addPostRoute('create', this.controller.create);
    this.addGetRoute(`get-by-id/:id`, this.controller.getById);
    this.addGetRoute(`get/:id`, this.controller.get);
    this.addGetRoute(`project-proposal/get/:id`, this.controller.getProjectProposalById);
    this.addPostRoute(`update/:id`, this.controller.update);
    this.addGetRoute(`inbox`, this.controller.getAllForInbox);
    this.addGetRoute(`outbox`, this.controller.getAllForOutbox);
    this.addGetRoute(`rejected`, this.controller.getAllForReject);
    this.addGetRoute(`comments/:id`, this.controller.getComments);
    this.addPostRoute(`forward/:id`, this.controller.forwarding);
    this.addPostRoute(`send-back/:id`, this.controller.sendBack);
  }
}

export default TenderDatasheetsRoute;
