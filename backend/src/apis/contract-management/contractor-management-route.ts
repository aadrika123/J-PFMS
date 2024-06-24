import { Application } from "express";
import { APIv1 } from "../APIv1";
import { ContractorManagementController } from "./contractor-management-controller";

export class ContractorManagementRoute extends APIv1{
  private controller: ContractorManagementController;

  constructor(routeId: string, app: Application) {
    super(routeId, app, "contractor-management");
    this.controller = new ContractorManagementController();
  }

  configure(): void {
    this.addGetRoute(`get-inbox-data`, this.controller.getInboxData);
    this.addGetRoute(`get-outbox-data`, this.controller.getInboxData);
    this.addGetRoute(`get-running-tenders-data`, this.controller.getInboxData);

    this.addGetRoute(`get-full-details`, this.controller.getFullDetails);
  }
}

