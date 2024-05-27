import { APIv1Response } from "../../APIv1";
import ProjectTypeDao from "../../dao/masters/projectTypeDao";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 24-05-2024
 */

class ProjectTypeController {
  private dao: ProjectTypeDao;
  constructor() {
    this.dao = new ProjectTypeDao();
  }

  get = async (): Promise<APIv1Response> => {
    // call dao
    const data = await this.dao.get();

    // return the result
    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };
}

export default ProjectTypeController;
