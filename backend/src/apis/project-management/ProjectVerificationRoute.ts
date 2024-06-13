import express from "express";
import ProjectVerificationController from "./ProjectVerificationController";
import { APIv1_New } from "../APIv1_New";

class ProjectVerificationRoute extends APIv1_New {
  private controller: ProjectVerificationController;

  constructor(routeId: string, routeName: string, app: express.Application) {
    super(routeId, app, routeName);
    this.controller = new ProjectVerificationController();
  }

  configure(): void {



    this.addGetRoute(`get/:proposalId`, this.controller.get);
    this.addGetRoute(`get-all`, this.controller.getAll);

    this.addGetRoute(`inbox`, this.controller.getInbox);
    this.addGetRoute('get-inbox-item-count', this.controller.getInboxItemCount);


    this.addGetRoute(`outbox`, this.controller.getOutbox);
    this.addGetRoute('get-outbox-item-count', this.controller.getOutboxItemCount);

    this.addGetRoute(`returned-back`, this.controller.getReturnedBackItems);
    this.addGetRoute(`returned-back/count`, this.controller.getReturnedBackItemCount);


    this.addGetRoute(`archive`, this.controller.getArchive);


    // mutable routes: use post
    this.addPostRoute(`acknowledge/:proposalId`, this.controller.acknowledge);
    this.addPostRoute(`approve`, this.controller.forwardProposal);
    this.addPostRoute(`send-back`, this.controller.sendBackProposal);
    this.addPostRoute('measurements/create', this.controller.recordMeasurements);
    this.addGetRoute('measurements/get', this.controller.getMeasurements);
    this.addPostRoute('measurements/update', this.controller.updateMeasurement);

    this.addGetRoute('schedule-of-rates/get', this.controller.getScheduleOfRates);


    this.addGetRoute('comments/get/:proposalId', this.controller.getComments);

    // this.addGetRoute(`document/get/:billId`, this.controller.getDocuments);
    // this.addPostRoute(`document/approve`, this.controller.approveDocument);
    // this.addPostRoute(`document/reject`, this.controller.rejectDocument);

    this.addFormDataPostRoute('measurements/ref-doc-upload', this.controller.referenceDocUpload, [
      { name: 'doc', maxCount: 1},
      
    ]);

  }
}

export default ProjectVerificationRoute;
