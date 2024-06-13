import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import project_proposalsDao from "../../dao/projectProposal/ProjectPerposalDao";
import * as Yup from "yup";
import { projectProposalValidationSchema } from "pfmslib";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 15-04-2024
 */

class project_proposalsController {
  private dao: project_proposalsDao;
  constructor() {
    this.dao = new project_proposalsDao();
  }

  get = async (req: Request): Promise<APIv1Response> => {
    const query = req.query;

    // validate
    await Yup.object({
      ulb: Yup.number(),
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      search: Yup.string().optional(),
      order: Yup.number().oneOf([-1, 1], "Invalid value for order").optional(),
    }).validate(query);

    // collect input
    const ulb: number = Number(query.ulb);
    const page: number = Number(query.page);
    const limit: number = Number(query.limit);
    const search: string = query?.search ? String(query.search) : "";
    const order: number = query?.order ? Number(query.order) : -1;

    // call dao
    const data = await this.dao.get(ulb, page, limit, search, order);

    // return the result
    if (!data)
      return { status: true, code: 201, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  generateUniqueRandomID = (existing: string[]) => {
    const date = new Date();

    let id;
    do {
      const randomNumber = Math.floor(Math.random() * 1000);
      id = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}${String(date.getDate()).padStart(2, "0")}${randomNumber}`;
    } while (existing.includes(id));

    existing.push(id);
    return id;
  };

  create = async (req: Request): Promise<APIv1Response> => {
    //validate
    const date = new Date();
    req.body.data.proposed_date = date;
    
    await projectProposalValidationSchema.validate(req.body.data);
    // req.body.data.wards=[1,2];

    // collect the input
    const record = req.body.data;

    const existingIDs: string[] = [];

    // generate bill numbers
    record.proposed_date = new Date();
    record.project_proposal_no =
      "PPN-" + this.generateUniqueRandomID(existingIDs);

    const docRecord = {
      description: record.file.file_name,
      path: record.file.path,
      size: record.file.size,
    };

    delete record.file;

    await this.dao.createOne(record, docRecord);

    // call dao
    // const result = await this.dao.create(data)

    return { status: true, code: 200, message: "Created", data: "OK" };
  };

  getById = async (req: Request): Promise<APIv1Response> => {
    //validate the input
    await Yup.object({
      id: Yup.number().required("id is required"),
    }).validate(req.params);

    //collect data

    const id: number = Number(req.params.id);

    //call dao
    const result: any[] = await this.dao.getById(id);

    //reaturn the result

    if (!result || result.length == 0)
      return { status: false, code: 200, message: "NOT FOUND", data: {} };

    return { status: true, code: 200, message: "OK", data: result };
  };

  update = async (req: Request): Promise<APIv1Response> => {
    //validate
    //  await projectProposalValidationSchema.validate(req.body.data);

    // collect the input
    const date = new Date();
    req.body.data.proposed_date = date;
    const record = req.body.data;
    const id = Number(req.params.id);
    // req.body.data.wards=[1, 3];

    const docRecord = {
      description: record.file.file_name,
      path: record.file.path,
      size: record.file.size,
    };

    delete record.file;

    await this.dao.update(id, record, docRecord);

    // call dao
    // const result = await this.dao.create(data)

    return { status: true, code: 200, message: "Updated", data: "OK" };
  };
}

export default project_proposalsController;
