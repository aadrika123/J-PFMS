import { APIv1Response } from "../../APIv1";
import StateDao from "../../dao/masters/stateDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-05-2024
 */

class StateController {
  private dao: StateDao;
  constructor() {
    this.dao = new StateDao();
  }

  get = async (): Promise<APIv1Response> => {
    // call dao
    const data = await this.dao.get();

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  getJharkhand = async (): Promise<APIv1Response> => {
    // call dao
    const data = await this.dao.getJharkhand();

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default StateController;
