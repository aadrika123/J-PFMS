import express from "express";
import { APIv1 } from "../../APIv1";
import ProjectTypeController from "../../controller/masters/projectTypeController";

class ProjectTypeRoute extends APIv1{
  private controller: ProjectTypeController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "project-type");
    this.controller = new ProjectTypeController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);
  }
}

export default ProjectTypeRoute;
