import express from "express";
import { APIv1 } from "../../APIv1";
// import BillsController from "../../controller/payments/projectproposalsController";
import project_proposalsController from "../../controller/payments/projectproposalsController";

class ProjectPerposalsRoute extends APIv1{
  private controller: project_proposalsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "Project Perposal");
    this.controller = new project_proposalsController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);
    this.addFormDataPostRoute('create', this.controller.create, [
      { name: 'perposals_for_document_backoffice', maxCount: 1 },
    ]);
    this.addGetRoute('get/:id', this.controller.getById);
  }
}

export default ProjectPerposalsRoute;
