import express from "express";
import { APIv1 } from "../../APIv1";
import StateController from "../../controller/masters/stateController";

class StateRoute extends APIv1{
  private controller: StateController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "state");
    this.controller = new StateController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);
    this.addGetRoute(`get/jharkhand`, this.controller.getJharkhand);
  }
}

export default StateRoute;
