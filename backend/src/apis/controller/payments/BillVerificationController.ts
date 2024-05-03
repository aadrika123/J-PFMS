// import { Request } from "express";
// import * as Yup from "yup";
// import BillVerificationDao from "../../dao/payments/BillVerificationDao";
// import { BillStages } from "pfmslib";
// import { APIv1Response } from "../../APIv1";

// /**
//  * | Author- Bijoy Paitandi
//  * | Created On- 15-04-2024
//  */

// class BillVerificationController {
//   private dao: BillVerificationDao;
//   constructor() {
//     this.dao = new BillVerificationDao();
//   }

//   commonCallFunction = async (
//     req: Request,
//     level: number,
//     callDao: (
//       ulbId: number,
//       page: number,
//       limit: number,
//       search: string,
//       order: number,
//       level: number
//     ) => any
//   ): Promise<APIv1Response> => {
//     const query = req.query;

//     // validate
//     await Yup.object({
//       ulbId: Yup.number().required("ulb is required"),
//       page: Yup.number().required("page is required."),
//       limit: Yup.number().required("limit is required."),
//       search: Yup.string().optional(),
//       order: Yup.number().oneOf([-1, 1], "Invalid value for order").optional(),
//     }).validate(query);

//     // collect input
//     const ulbId: number = Number(query.ulbId);
//     const page: number = Number(query.page);
//     const limit: number = Number(query.limit);
//     const search: string = query?.search ? String(query.search) : "";
//     const order: number = query?.order ? Number(query.order) : -1;

//     const data = await callDao(ulbId, page, limit, search, order, level);

//     if (!data)
//       return { status: true, code: 201, message: "Not Found", data: data };
//     return { status: true, code: 200, message: "Found", data: data };
//   };

//   getInbox = async (req: Request): Promise<APIv1Response> => {
//     const user = req.body.user;
//     if (user.isJuniorEngineer())
//       return await this.commonCallFunction(
//         req,
//         BillStages.ApprovedByJuniorEngineer,
//         this.dao.getLevel0JuniorEngineerInbox
//       );
//     else if (user.isAssistantEngineer())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByAssistantEngineer,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isExecutiveEngineer())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveEngineer,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isExecutiveOfficer1())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveOfficerAmc1,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isAccDepManager())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByAccountDepartmentManager,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isInternalAuditor())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByInternalAuditor,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isExecutiveOfficer2())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveOfficerAmc2,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isAccDepPdf())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByAccountDepartmentPdf,
//         this.dao.getHigherLevelInbox
//       );
//     else if (user.isExecutiveOfficer3())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveOfficerAmc3,
//         this.dao.getHigherLevelInbox
//       );

//     throw new Error("User not authorized.");
//   };

//   ////////////////////////// get Outbox
//   getOutbox = async (req: Request): Promise<APIv1Response> => {
//     const user = req.body.user;
//     if (user.isJuniorEngineer())
//       return await this.commonCallFunction(
//         req,
//         BillStages.ApprovedByJuniorEngineer,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isAssistantEngineer())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByAssistantEngineer,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isExecutiveEngineer())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveEngineer,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isExecutiveOfficer1())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveOfficerAmc1,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isAccDepManager())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByAccountDepartmentManager,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isInternalAuditor())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByInternalAuditor,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isExecutiveOfficer2())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveOfficerAmc2,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isAccDepPdf())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByAccountDepartmentPdf,
//         this.dao.getHigherLevelOutbox
//       );
//     else if (user.isExecutiveOfficer3())
//       return this.commonCallFunction(
//         req,
//         BillStages.ApprovedByExecutiveOfficerAmc3,
//         this.dao.getHigherLevelOutbox
//       );

//     throw new Error("User not authorized.");
//   };

//   ////// Getting Bill By Id
//   getBillById = async (req: Request) => {
//     const params = req.params;

//     // validate
//     await Yup.object({
//       billId: Yup.number().required("billId is required"),
//     }).validate(params);

//     // collecting requirements
//     const billId: number = Number(params.billId);

//     const data = await this.dao.getBillById(billId);

//     if (!data)
//       return { status: false, code: 200, message: "Not Found", data: data };

//     return { status: true, code: 200, message: "Found", data: data };
//   };

//   ///// Approving Bill
//   approveBill = async (req: Request) => {
//     const { data, user } = req.body;
//     let approval_stage_id: number = BillStages.ApprovedByJuniorEngineer;
//     await Yup.object({
//       bill_id: Yup.number().required("billId is required"),
//     }).validate(data);

//     ////// Getting Last Bill From Bill Checking By Bill Id
//     const lastBill = await this.dao.getLastBillFromBillCheckingByBillId(
//       data?.bill_id
//     );

//     if (!lastBill) if (!user.isJuniorEngineer()) throw "You are not allowed.";

//     if (user.isAssistantEngineer())
//       approval_stage_id = BillStages.ApprovedByAssistantEngineer;
//     else if (user.isExecutiveEngineer())
//       approval_stage_id = BillStages.ApprovedByExecutiveEngineer;
//     else if (user.isExecutiveOfficer1())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc1;
//     else if (user.isAccDepManager())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentManager;
//     else if (user.isInternalAuditor())
//       approval_stage_id = BillStages.ApprovedByInternalAuditor;
//     else if (user.isExecutiveOfficer2())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc2;
//     else if (user.isAccDepPdf())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentPdf;
//     else if (user.isExecutiveOfficer3())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc3;

//     const reqData = {
//       bill_id: data?.bill_id,
//       checker_id: user?.getUserId(),
//       comment: data?.comment,
//       approval_stage_id: approval_stage_id,
//     };

//     const resData = await this.dao.approveBill(reqData);

//     return { status: true, code: 200, message: "Approved", data: resData };
//   };

//   ///// Approving Bill
//   sendBackBill = async (req: Request) => {
//     const { data, user } = req.body;
//     let approval_stage_id: number = BillStages.ApprovedByJuniorEngineer;
//     await Yup.object({
//       bill_id: Yup.number().required("billId is required"),
//     }).validate(data);

//     ////// Getting Last Bill From Bill Checking By Bill Id
//     const lastBill = await this.dao.getLastBillFromBillCheckingByBillId(
//       data?.bill_id
//     );

//     if (!lastBill) if (!user.isJuniorEngineer()) throw "You are not allowed.";

//     if (user.isAssistantEngineer())
//       approval_stage_id = BillStages.ApprovedByAssistantEngineer;
//     else if (user.isExecutiveEngineer())
//       approval_stage_id = BillStages.ApprovedByExecutiveEngineer;
//     else if (user.isExecutiveOfficer1())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc1;
//     else if (user.isAccDepManager())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentManager;
//     else if (user.isInternalAuditor())
//       approval_stage_id = BillStages.ApprovedByInternalAuditor;
//     else if (user.isExecutiveOfficer2())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc2;
//     else if (user.isAccDepPdf())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentPdf;
//     else if (user.isExecutiveOfficer3())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc3;

//     const reqData = {
//       bill_id: data?.bill_id,
//       checker_id: user?.getUserId(),
//       comment: data?.comment,
//       approval_stage_id: approval_stage_id,
//     };

//     const resData = await this.dao.sendBackBill(reqData);

//     return { status: true, code: 200, message: "Approved", data: resData };
//   };

//   //////////////////// BILL DOCUMENTS VERIFICATION /////////////////////////////////

//   getDocuments = async (req: Request) => {
//     const { user } = req.body;
//     const billId = Number(req.params.billId);
//     let approval_stage_id: number = BillStages.ApprovedByJuniorEngineer;

//     if (user.isAssistantEngineer())
//       approval_stage_id = BillStages.ApprovedByAssistantEngineer;
//     else if (user.isExecutiveEngineer())
//       approval_stage_id = BillStages.ApprovedByExecutiveEngineer;
//     else if (user.isExecutiveOfficer1())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc1;
//     else if (user.isAccDepManager())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentManager;
//     else if (user.isInternalAuditor())
//       approval_stage_id = BillStages.ApprovedByInternalAuditor;
//     else if (user.isExecutiveOfficer2())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc2;
//     else if (user.isAccDepPdf())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentPdf;
//     else if (user.isExecutiveOfficer3())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc3;

//     const resData = await this.dao.getDocumentsForLevel0(billId, approval_stage_id);

//     return {
//       status: true,
//       code: 200,
//       message: "Document Found",
//       data: resData,
//     };
//   };

//   ////////////////// Approve Document
//   approveDocument = async (req: Request) => {
//     const { data, user } = req.body;
//     await Yup.object({
//       billId: Yup.number().required("billId is required"),
//       docId: Yup.number().required("docId is required"), 
//       description: Yup.string().required("description is required."),
//       path: Yup.string().required("path is required."),
//       remarks: Yup.string().required("remarks is required.")
//     }).validate(data);

//     let approval_stage_id: number = BillStages.ApprovedByJuniorEngineer;

//     if (user.isAssistantEngineer())
//       approval_stage_id = BillStages.ApprovedByAssistantEngineer;
//     else if (user.isExecutiveEngineer())
//       approval_stage_id = BillStages.ApprovedByExecutiveEngineer;
//     else if (user.isExecutiveOfficer1())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc1;
//     else if (user.isAccDepManager())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentManager;
//     else if (user.isInternalAuditor())
//       approval_stage_id = BillStages.ApprovedByInternalAuditor;
//     else if (user.isExecutiveOfficer2())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc2;
//     else if (user.isAccDepPdf())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentPdf;
//     else if (user.isExecutiveOfficer3())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc3;

//       const record = {
//         bill_id: Number(data.billId),
//         docId: Number(data.docId),
//         description: data.description,
//         path: data.path,
//         approved: true,
//         approved_by_id: approval_stage_id,
//         approval_date: new Date().toISOString(),
//         remarks: data.remarks
//       }

//     let resData = null
    
//     if(user.isJuniorEngineer()) resData = await this.dao.approveDocumentForLevel0(record);
//     else resData = await this.dao.approveDocumentForHigherLevel(record)

//     return {
//       status: true,
//       code: 200,
//       message: "Approved Document",
//       data: resData,
//     };
//   };

//    ////////////////// Approve Document
//    rejectDocument = async (req: Request) => {
//     const { data, user } = req.body;
//     await Yup.object({
//       billId: Yup.number().required("billId is required"),
//       docId: Yup.number().required("docId is required"), 
//       description: Yup.string().required("description is required."),
//       path: Yup.string().required("path is required."),
//       remarks: Yup.string().required("remarks is required.")
//     }).validate(data);

//     let approval_stage_id: number = BillStages.ApprovedByJuniorEngineer;

//     if (user.isAssistantEngineer())
//       approval_stage_id = BillStages.ApprovedByAssistantEngineer;
//     else if (user.isExecutiveEngineer())
//       approval_stage_id = BillStages.ApprovedByExecutiveEngineer;
//     else if (user.isExecutiveOfficer1())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc1;
//     else if (user.isAccDepManager())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentManager;
//     else if (user.isInternalAuditor())
//       approval_stage_id = BillStages.ApprovedByInternalAuditor;
//     else if (user.isExecutiveOfficer2())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc2;
//     else if (user.isAccDepPdf())
//       approval_stage_id = BillStages.ApprovedByAccountDepartmentPdf;
//     else if (user.isExecutiveOfficer3())
//       approval_stage_id = BillStages.ApprovedByExecutiveOfficerAmc3;

//       const record = {
//         bill_id: Number(data.billId),
//         docId: Number(data.docId),
//         description: data.description,
//         path: data.path,
//         approved: true,
//         approved_by_id: approval_stage_id,
//         approval_date: new Date().toISOString(),
//         remarks: data.remarks
//       }

//     const resData = await this.dao.rejectDocumentForHigherLevel(record)

//     return {
//       status: true,
//       code: 200,
//       message: "Rejected Document",
//       data: resData,
//     };
//   };
// }

// export default BillVerificationController;
