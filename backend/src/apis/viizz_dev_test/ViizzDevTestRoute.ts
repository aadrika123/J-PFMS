import express from "express";
import ViizzDevTestController from "./ViizzDevTestController";
import { APIv1_New } from "../APIv1_New";

class ViizzDevTestRoute extends APIv1_New{
  private controller: ViizzDevTestController;

  constructor(routeId: string, routeName: string, app: express.Application) {
    super(routeId, app, routeName);
    this.controller = new ViizzDevTestController();
  }

  configure(): void {
    this.addGetRoute(`get`, this.controller.get);
  }
}

export default ViizzDevTestRoute;
