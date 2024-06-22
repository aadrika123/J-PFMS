import { Application } from "express";
import { APIv1 } from "../APIv1";
import ContractManagementController from "./contract-management-controller";

class ContractManagementRoute extends APIv1{
  private controller: ContractManagementController;

  constructor(routeId: string, app: Application) {
    super(routeId, app, "contract-management");
    this.controller = new ContractManagementController();
  }

  configure(): void {
    this.addGetRoute(`get-inbox-data`, this.controller.getInboxData);
  }
}

export default ContractManagementRoute;
