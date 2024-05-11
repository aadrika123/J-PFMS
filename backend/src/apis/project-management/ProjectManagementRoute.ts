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
    this.addGetRoute(`get`, this.controller.get);
    this.addGetRoute(`inbox`, this.controller.getInbox);
  }
}

export default ProjectManagementRoute;
