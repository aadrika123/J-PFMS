import { APIv1Response } from "../../APIv1";
import DistrictDao from "../../dao/masters/districtDao";
import * as Yup from "yup";
import { Request } from "express";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-05-2024
 */

class DistrictController {
  private dao: DistrictDao;
  constructor() {
    this.dao = new DistrictDao();
  }

  get = async (): Promise<APIv1Response> => {
    // call dao
    const data = await this.dao.get();

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  getDistrictsByState = async (req: Request): Promise<APIv1Response> => {
    //validate the input
    await Yup.object({
      stateId: Yup.number().required("stateId is required"),
    }).validate(req.params);

    //collect data

    const id: number = Number(req.params.stateId);

    // call dao
    const data = await this.dao.getDistrictsByState(id);

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default DistrictController;
