import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import * as Yup from "yup";
import UlbDao from "../../dao/masters/ulbDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-05-2024
 */

class UlbController {
  private dao: UlbDao;
  constructor() {
    this.dao = new UlbDao();
  }

  get = async (): Promise<APIv1Response> => {
    // call dao
    const data = await this.dao.getUlbs();

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  getFilteredUlbs = async (req: Request): Promise<APIv1Response> => {
    const query = req.query;

    await Yup.object({
      stateId: Yup.number().optional(),
      districtId: Yup.number().optional(),
    }).validate(query);

    // collect input
    const state: number = Number(query.stateId);
    const district: number = Number(query.districtId);

    // call dao
    const data = await this.dao.getFilteredUlbs({ state, district });

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  getUlbsByDistrict = async (req:Request) =>{
    await Yup.object({
      districtId: Yup.number().nullable().optional(),
    }).validate(req.params);

    // collect input
    const district: number = Number(req.params.districtId);

    // call dao
    const data = await this.dao.getUlbsByDistrict(district);

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  }

  getWardsByUlb = async (req: Request): Promise<APIv1Response> => {
    //validate the input
    await Yup.object({
      ulbId: Yup.number().nullable().required("id is required"),
    }).validate(req.params);

    //collect data
    const id: number = Number(req.params.ulbId);

    //call dao
    const result: any[] = await this.dao.getWardsByUlb(id);

    //reaturn the result

    if (!result || result.length == 0)
      return { status: false, code: 200, message: "NOT FOUND", data: {} };

    return { status: true, code: 200, message: "OK", data: result };
  };
  
}

export default UlbController;
