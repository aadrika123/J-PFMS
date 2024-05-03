// import express from "express";
// import { APIv1 } from "../../APIv1";
// import BillVerificationController from "../../controller/payments/BillVerificationController";

// class BillVerificationRoute extends APIv1 {
//   private controller: BillVerificationController;

//   constructor(routeId: string, app: express.Application) {
//     super(routeId, app, "bill-verification");
//     this.controller = new BillVerificationController();
//   }

//   configure(): void {
//     this.addGetRoute(`inbox`, this.controller.getInbox);
//     this.addGetRoute(`outbox`, this.controller.getOutbox);

//     this.addGetRoute(`get/:billId`, this.controller.getBillById);

//     this.addPostRoute(`approve`, this.controller.approveBill);

//     this.addPostRoute(`send-back`, this.controller.sendBackBill);

//     ///////////////////////////// BILL DOCUMENTS VERIFICATION ///////////////////

//     this.addGetRoute(`document/get/:billId`, this.controller.getDocuments)
//     this.addPostRoute(`document/approve`, this.controller.approveDocument)
//     this.addPostRoute(`document/reject`, this.controller.rejectDocument)

    
//   }
// }

// export default BillVerificationRoute;
