import express from "express";
import { APIv1 } from "../../APIv1";
import DistrictController from "../../controller/masters/districtController";

class DistrictRoute extends APIv1{
  private controller: DistrictController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "district");
    this.controller = new DistrictController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);                         
    this.addGetRoute('get/:stateId', this.controller.getDistrictsByState);
  }
}

export default DistrictRoute;
