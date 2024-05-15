import express from "express";
import { APIv1 } from "../../APIv1";
import UlbController from "../../controller/masters/ulbController";

class UlbRoute extends APIv1{
  private controller: UlbController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "ulb");
    this.controller = new UlbController();
  }

  configure(): void {
    this.addGetRoute(`get-all`, this.controller.get);
    this.addGetRoute('get-filtered', this.controller.getFilteredUlbs);
    this.addGetRoute('get-by-district/:districtId', this.controller.getUlbsByDistrict);
    this.addGetRoute('ward/get/:ulbId', this.controller.getWardsByUlb);
    this.addGetRoute('get/:ulbId', this.controller.getDetailsByUlb);
    this.addGetRoute('department/get', this.controller.getAllDepartments);
  }
}

export default UlbRoute;
