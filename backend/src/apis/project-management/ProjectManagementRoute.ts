import express from "express";
import ProjectManagementController from "./ProjectManagementController";
import { APIv1_New } from "../APIv1_New";

class ProjectManagementRoute extends APIv1_New{
  private controller: ProjectManagementController;

  constructor(routeId: string, routeName: string, app: express.Application) {
    super(routeId, app, routeName);
    this.controller = new ProjectManagementController();
  }

  configure(): void {
    this.addGetRoute(`get/:proposalId`, this.controller.get);
    this.addGetRoute(`get-all`, this.controller.getAll);
    this.addGetRoute(`inbox`, this.controller.getInbox);
    this.addGetRoute(`outbox`, this.controller.getOutbox);
    this.addGetRoute(`archive`, this.controller.getArchive);

    // mutable routes: use post
    this.addPostRoute(`acknowledge/:proposalId`, this.controller.acknowledge);
  }
}

export default ProjectManagementRoute;
