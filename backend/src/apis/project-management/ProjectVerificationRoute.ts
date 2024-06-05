import express from "express";
import ProjectVerificationController from "./ProjectVerificationController";
import { APIv1_New } from "../APIv1_New";

class ProjectVerificationRoute extends APIv1_New{
  private controller: ProjectVerificationController;

  constructor(routeId: string, routeName: string, app: express.Application) {
    super(routeId, app, routeName);
    this.controller = new ProjectVerificationController();
  }

  configure(): void {
    this.addGetRoute(`get/:proposalId`, this.controller.get);
    this.addGetRoute(`get-all`, this.controller.getAll);
    this.addGetRoute(`inbox`, this.controller.getInbox);
    this.addGetRoute(`outbox`, this.controller.getOutbox);
    this.addGetRoute(`archive`, this.controller.getArchive);
    this.addGetRoute('get-outbox-item-count', this.controller.getOutboxItemCount);
    this.addGetRoute('get-inbox-item-count', this.controller.getInboxItemCount);


    // mutable routes: use post
    this.addPostRoute(`acknowledge/:proposalId`, this.controller.acknowledge);
    this.addPostRoute(`approve`, this.controller.approveProposal);
    this.addPostRoute(`send-back`, this.controller.sendBackProposal);
    this.addPostRoute('measurements/create', this.controller.recordMeasurements);
    this.addGetRoute('measurements/get', this.controller.getMeasurements);
    this.addPostRoute('measurements/update', this.controller.updateMeasurement);

    this.addGetRoute('schedule-of-rates/get', this.controller.getScheduleOfRates);

    
    // this.addGetRoute(`document/get/:billId`, this.controller.getDocuments);
    // this.addPostRoute(`document/approve`, this.controller.approveDocument);
    // this.addPostRoute(`document/reject`, this.controller.rejectDocument);
  }
}

export default ProjectVerificationRoute;
