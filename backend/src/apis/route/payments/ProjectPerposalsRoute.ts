import express from "express";
import { APIv1 } from "../../APIv1";
import project_proposalsController from "../../controller/payments/ProjectProposalsController";

class ProjectPerposalsRoute extends APIv1{
  private controller: project_proposalsController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "project-perposal");
    this.controller = new project_proposalsController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);
    this.addFormDataPostRoute('create', this.controller.create, [
      { name: 'perposals_for_document_backoffice', maxCount: 1 },
    ]);
    this.addFormDataPostRoute('update/:id', this.controller.update, [
      { name: 'perposals_for_document_backoffice', maxCount: 1 },
    ]);
    this.addGetRoute('get/:id', this.controller.getById);
  }
}

export default ProjectPerposalsRoute;
