import { APIv1Response } from "../APIv1";
import { Request } from "express";
import ProjectManagementDao from "./ProjectManagementDao";
import * as Yup from "yup";



class ProjectManagementController {
  private dao: ProjectManagementDao;
  constructor() {
    this.dao = new ProjectManagementDao();
  }

  get = async (req: Request): Promise<APIv1Response> => {


    return new Promise((resolve, reject) => {

      // validate the data

      Yup.object({
        page: Yup.number().required("page is required."),
        limit: Yup.number().required("limit is required."),
        order: Yup.number().required("order is required.").oneOf([1, -1])
      }).validate(req.query).then(() => {

        //collect data
        const page: number = Number(req.query.page);
        const limit: number = Number(req.query.limit);
        const order: number = Number(req.query.order);
        
        console.log(req.query);

        // call dao
        this.dao.get(req.query, page, limit, order).then((data: any) => {
          if (!data) {
            const result = { status: true, code: 200, message: "Not Found", data: data };
            resolve(result);
          } else {
            const result = { status: true, code: 200, message: "Found", data: data };
            resolve(result);
          }
        }).catch((error) => {
          reject(error);
        })


      }).catch((error) => {
        reject(error);
      });

    });
  };
}

export default ProjectManagementController;
