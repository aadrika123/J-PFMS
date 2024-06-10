/**
 * | Author- Sanjiv Kumar
 * | Created On- 04-06-2024
 * | Status- open
 * | Created For- Tender Basic Details Controller
 */
import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import TenderDatasheetsDao from "../../dao/tenderDatasheet/tenderDatasheetDao";
import { tenderDatasheetSchema } from "pfmslib";

class TenderDatasheetsController {
  private dao: TenderDatasheetsDao;
  constructor() {
    this.dao = new TenderDatasheetsDao();
  }

  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;

    await tenderDatasheetSchema.validate(requestData);

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

    return { status: true, code: 200, message: "Updated", data: data };
  };
}

export default TenderDatasheetsController;
