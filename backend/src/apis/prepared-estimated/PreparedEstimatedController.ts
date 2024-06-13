import { Request } from "express";
import { APIv1Response } from "../APIv1";
import PreparedEstimatedDao from "./PreparedEstimatedDao";

class PreparedEstimatedController {
  private dao: PreparedEstimatedDao;

  constructor() {
    this.dao = new PreparedEstimatedDao();
  }

  get = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      // call dao
      this.dao
        .get(req)
        .then((data: any) => {
          if (!data) {
            const result = {
              status: true,
              code: 200,
              message: "Not Found",
              data: data,
            };
            resolve(result);
          } else {
            const result = {
              status: true,
              code: 200,
              message: "Found",
              data: data,
            };
            resolve(result);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  // 
   getById = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const id = parseInt(req.params.id);
      this.dao
        .getById(id)
        .then((data: any) => {
          const result = {
            status: true,
            code: 200,
            message: data ? "Found" : "Not Found",
            data,
          };
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  create = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      this.dao
        .create(req.body)
        .then((data: any) => {
          const result = {
            status: true,
            code: 201,
            message: "Created",
            data,
          };
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  update = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const id = parseInt(req.params.id);
      this.dao
        .update(id, req.body)
        .then((data: any) => {
          const result = {
            status: true,
            code: 200,
            message: "Updated",
            data,
          };
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  delete = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const id = parseInt(req.params.id);
      this.dao
        .delete(id)
        .then(() => {
          const result = {
            status: true,
            code: 200,
            message: "Deleted",
            data: null, // Ensure data property is included
          };
          resolve(result);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };
}
export default PreparedEstimatedController;
