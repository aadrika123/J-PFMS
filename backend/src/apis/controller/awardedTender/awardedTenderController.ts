/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tenders Controller
 */
import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import * as Yup from "yup";
import AwardedTendersDao from "../../dao/awardedTender/awardedTendersDao";

class AwardedTenderController {
  private dao: AwardedTendersDao;
  constructor() {
    this.dao = new AwardedTendersDao();
  }

  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;

    // await AwardedTenderchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

  ///// Get Awarded Tender By Id ////
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

    ///// Getting all awarded tender form details by Id
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

    const data = await this.dao.update(id);

    return { status: true, code: 200, message: "Updated", data };
  };

  ///// Getting all Approved Tender Project Proposals
  getAllApprovedTendersDatasheet = async (req: Request): Promise<APIv1Response> => {
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

    const data = this.dao.getAllApprovedTendersDatasheet(
      filters,
      page,
      limit,
      order
    );

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default AwardedTenderController;
