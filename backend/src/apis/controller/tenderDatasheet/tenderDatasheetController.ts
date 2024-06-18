/**
 * | Author- Sanjiv Kumar
 * | Created On- 04-06-2024
 * | Status- open
 * | Created For- Tender Basic Details Controller
 */
import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import TenderDatasheetsDao from "../../dao/tenderDatasheet/tenderDatasheetDao";
import { tenderDatasheetSchema, User } from "pfmslib";
import * as Yup from "yup";

class TenderDatasheetsController {
  private dao: TenderDatasheetsDao;
  constructor() {
    this.dao = new TenderDatasheetsDao();
  }

  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

  ///// Getting all tender form details by Id
  getById = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const data = await this.dao.getById(id);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  ///// Getting all tender form details by Id
  getProjectProposalById = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const data = await this.dao.getProjectProposalById(id);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  ///// Getting all tender form details by Id
  get = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const data = await this.dao.get(id);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  /////// Updating the status draft to published
  update = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const user = new User(req.body.auth);

    const approvalData = {
      user_id: user.getUserId(),
      checker_level: user.getUserLevelForTenderApproval(),
      assigned_level: user.getUserLevelForTenderApproval()+1,
      comment: req.body.data.comment,
    };

    const data = await this.dao.update(id, approvalData);

    return { status: true, code: 200, message: "Updated", data };
  };

  ///// Getting all Project Proposals for inbox
  getAllForInbox = async (req: Request): Promise<APIv1Response> => {
    const user = new User(req.body.auth);
    await Yup.object({
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      order: Yup.number().required("order is required.").oneOf([1, -1]),
    }).validate(req.query);

    //collect data
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const order: number = Number(req.query.order);

    const filters = req.query;

    const level: number = user.getUserLevelForTenderApproval();
    const data =
      level === 1
        ? await this.dao.getAllForFirstLevelInbox(filters, page, limit, order)
        : await this.dao.getAllForHigherLevelInbox(filters, page, limit, order, level);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  ///// Getting all  Project Proposals for Outbox
  getAllForOutbox = async (req: Request): Promise<APIv1Response> => {
    const user = new User(req.body.auth);
    await Yup.object({
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      order: Yup.number().required("order is required.").oneOf([1, -1]),
    }).validate(req.query);

    //collect data
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const order: number = Number(req.query.order);

    const filters = req.query;

    const level: number = user.getUserLevelForTenderApproval() + 1;
    const data = await this.dao.getAllForAllLevelOutbox(filters, page, limit, order, level);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  ///// Getting all  Project Proposals for Rejected
  getAllForReject = async (req: Request): Promise<APIv1Response> => {
    const user = new User(req.body.auth);
    await Yup.object({
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      order: Yup.number().required("order is required.").oneOf([1, -1]),
    }).validate(req.query);

    //collect data
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const order: number = Number(req.query.order);

    const filters = req.query;

    const level: number = user.getUserLevelForTenderApproval();
    const data = await this.dao.getAllForAllLevelRejected(filters, page, limit, order, level);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

   ///// Getting Comments
   getComments = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const data = await this.dao.getComments(id);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

  ///// Forwarding
  forwarding = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const user = new User(req.body.auth);

    const approvalData = {
      user_id: user.getUserId(),
      checker_level: user.getUserLevelForTenderApproval(),
      assigned_level: user.getUserLevelForTenderApproval()+1,
      comment: req.body.data.comment,
    };

    const data = await this.dao.forward(id, approvalData);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };

   ///// Sending Back
   sendBack = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.id);

    const user = new User(req.body.auth);

    const approvalData = {
      user_id: user.getUserId(),
      checker_level: user.getUserLevelForTenderApproval(),
      assigned_level: 1,
      comment: req.body.data.comment,
    };

    const data = await this.dao.sendBack(id, approvalData);

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default TenderDatasheetsController;
