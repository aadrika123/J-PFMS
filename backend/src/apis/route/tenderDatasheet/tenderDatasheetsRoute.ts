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
    this.addPostRoute(`update/:id`, this.controller.update);
    
    // this.addFormDataPostRoute('create', this.controller.create, [
    //   { name: 'perposals_for_document_backoffice', maxCount: 1 },
    // ]);
    // this.addFormDataPostRoute('update/:id', this.controller.update, [
    //   { name: 'perposals_for_document_backoffice', maxCount: 1 },
    // ]);
    // this.addGetRoute('get/:id', this.controller.getById);
  }
}

export default TenderDatasheetsRoute;
