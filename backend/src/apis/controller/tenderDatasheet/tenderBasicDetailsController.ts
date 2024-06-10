/**
 * | Author- Sanjiv Kumar
 * | Created On- 04-06-2024
 * | Status- open
 * | Created For- Tender Basic Details Controller
 */
import { Request } from "express";
import TenderBasicDetailsDao from "../../dao/tenderDatasheet/tenderBasicDetailsDao";
import { APIv1Response } from "../../APIv1";
import { tenderBasicDetailsSchema } from "pfmslib";

class TenderBasicDetailsController {
  private dao: TenderBasicDetailsDao;
  constructor() {
    this.dao = new TenderBasicDetailsDao();
  }

   /* Create ro Update Tender Basic Details */
  create = async (req: Request): Promise<APIv1Response> => {
    const requestData = req.body.data;

    await tenderBasicDetailsSchema.validate(requestData);

    const data = await this.dao.create(requestData);

    return { status: true, code: 200, message: "Created", data: data };
  };

   /* Get Tender Basic Detail By Tender Datasheet Id */
   getByTenderDatasheetId = async (req: Request): Promise<APIv1Response> => {
    const id: number = Number(req.params.tenderDatasheetId)

    const data = await this.dao.getByTenderDatasheetId(id);

    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default TenderBasicDetailsController;
