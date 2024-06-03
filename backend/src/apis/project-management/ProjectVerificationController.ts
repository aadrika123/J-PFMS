import { APIv1Response } from "../APIv1";
import { Request } from "express";
import ProjectVerificationDao from "./ProjectVerificationDao";
import * as Yup from "yup";
import { MeasurementRecordValidation, ProjectProposalStages } from "pfmslib";


/*
  Created By: Bijoy
  Status: Open
*/


class ProjectVerificationController {
  private dao: ProjectVerificationDao;
  constructor() {
    this.dao = new ProjectVerificationDao();
  }

  get = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      // validate
      Yup.object({
        proposalId: Yup.number().required(),
      }).validate(req.params).then(() => {
        // collect data
        const proposalId = Number(req.params.proposalId);
        // call dao
        this.dao.get(proposalId).then((data) => {
          if (!data) {
            const result = { status: true, code: 200, message: "Not Found", data: data };
            resolve(result);
          } else {
            const result = { status: true, code: 200, message: "Found", data: data };
            resolve(result);
          }
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });

    });
  }

  getAll = async (req: Request): Promise<APIv1Response> => {

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

        const filters = req.query;

        // call dao
        this.dao.getAll(filters, page, limit, order).then((data: any) => {
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


  getInbox = async (req: Request): Promise<APIv1Response> => {


    console.log("Inbox");
    return new Promise((resolve, reject) => {

      const user = req.body.user;

      if (user.isJuniorEngineer()) {
        console.log(user.getRole() + " Inbox");

        this.commonCallFunction(
          req,
          ProjectProposalStages.ApprovedByBackOffice,
          this.dao.getLevel0JuniorEngineerInbox
        ).then((data: any) => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        })

      } else if (user.isAssistantEngineer()) {
        // reject("Assistant Engineer inbox Not supported Yet!");

        this.commonCallFunction(
          req,
          ProjectProposalStages.ApprovedByJuniorEngineer,
          this.dao.getHigherLevelInbox
        ).then((data: any) => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        })

      } else {
        console.log(user.getRole());
        reject(`${user.getRole()} inbox is not supported yet`);
      }
    });
  }

  getOutbox = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const user = req.body.user;
      if (user.isJuniorEngineer()) {
        console.log("Junior Engineer Output");
        this.commonCallFunction(req, ProjectProposalStages.ApprovedByJuniorEngineer, this.dao.getHigherLevelOutbox)
          .then((data: any) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          })

      } else if (user.isCityManager()) {
        console.log("City Manager");
        reject("City Manager Outbox Not supported Yet!");
      } else {
        console.log(user.getRole());
        reject(`${user.getRole()} outbox is not supported yet`);
      }
    });
  }


  getArchive = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const user = req.body.user;
      const data: any[] = [];
      const result = { status: true, code: 200, message: "Found", data: data };
      resolve(result);

    });
  }

  acknowledge = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {

      //validate
      Yup.object({
        proposalId: Yup.number().required("proposal id is required")
      }).validate(req.params).then((xx) => {

        console.log("xx", xx);
        const p = req.params;
        this.dao.acknowledge(Number(p.proposalId)).then((data) => {
          if (!data) {
            const result = { status: true, code: 200, message: "Failure", data: data };
            resolve(result);
          } else {
            const result = { status: true, code: 200, message: "Success", data: data };
            resolve(result);
          }
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  approveProposal = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      // validate
      const { data, user } = req.body;
      let approval_stage_id: number = ProjectProposalStages.ApprovedByJuniorEngineer;

      Yup.object({
        proposalId: Yup.number().required("proposalId is required"),
      }).validate(data).then((xx) => {

        this.dao.getLastProposalCheckingRecordByProposalId(
          data?.proposalId
        ).then((lastRecord) => {

          if (!lastRecord && !user.isJuniorEngineer()) {
            reject(new Error("You are not allowed."));
          } else {
            if (user.isAssistantEngineer())
              approval_stage_id = ProjectProposalStages.ApprovedByAssistantEngineer;

            const reqData = {
              project_proposal_id: data?.proposalId,
              checker_id: user?.getUserId(),
              comment: data?.comment,
              approval_stage_id: approval_stage_id,
            };

            this.dao.approveProposal(reqData).then((result) => {
              const d = { status: true, code: 200, message: "Success", data: result };
              resolve(d);
            }).catch((error) => {
              reject(error);
            });
          }

        }).catch((error) => {
          reject(error);
        });



      }).catch((error) => {
        reject(error);
      });


    });
  }


  getOutboxItemCount = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const { user } = req.body;
      let level = -1;
      const ulbId = user.getUlbId();

      if (user.isJuniorEngineer()) level = ProjectProposalStages.ApprovedByJuniorEngineer;
      this.dao.getOutboxItemCount(ulbId, level).then((count: any) => {
        const result = { status: true, code: 200, message: "Not Found", data: { count: count } };
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getInboxItemCount = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const { user } = req.body;
      let level = -1;
      const ulbId = user.getUlbId();

      if (user.isJuniorEngineer()) level = ProjectProposalStages.ApprovedByBackOffice;
      else if (user.isAssistantEngineer()) level = ProjectProposalStages.ApprovedByJuniorEngineer;

      this.dao.getHigherLevelInboxItemCount(ulbId, level).then((count: any) => {
        const result = { status: true, code: 200, message: "Not Found", data: { count: count } };
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  recordMeasurements = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {

      const { data, user } = req.body;
      if (user.isJuniorEngineer()) {

        // validate measurement records
        Yup.array(MeasurementRecordValidation.measurementRecordValidationSchema).validate(data).then(() => {

          this.dao.recordMeasurements(data).then((daoResult) => {
            const result = { status: true, code: 200, message: "OK", data: daoResult };
            resolve(result);
          }).catch((error) => {
            reject(error);
          })

        }).catch((error) => {
          reject(error);
        });



      } else {
        reject(new Error("Measurements can be added by Junior Engineer only."));
      }
    });


  }



  commonCallFunction = async (
    req: Request,
    level: number,
    callDao: (
      filters: any,
      ulbId: number,
      page: number,
      limit: number,
      order: number,
      level: number
    ) => Promise<any>
  ): Promise<APIv1Response> => {

    const user = req.body.user;

    return new Promise((resolve, reject) => {

      const query = req.query;

      // validate
      Yup.object({
        page: Yup.number().required("page is required."),
        limit: Yup.number().required("limit is required."),
        order: Yup.number().required("order is required.").oneOf([1, -1])
      }).validate(req.query).then(() => {

        //collect data
        const page: number = Number(req.query.page);
        const limit: number = Number(req.query.limit);
        const order: number = Number(req.query.order);
        const ulbId = user.getUlbId();


        callDao(query, ulbId, page, limit, order, level).then((data: any) => {
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


  getMeasurements = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {

      // validate the data
      Yup.object({
        proposal_id: Yup.number().required("proposal_id is required"),
        page: Yup.number().required("page is required."),
        limit: Yup.number().required("limit is required."),
        order: Yup.number().required("order is required.").oneOf([1, -1])
      }).validate(req.query).then(() => {

        //collect data
        const proposal_id: number = Number(req.query.proposal_id);
        const page: number = Number(req.query.page);
        const limit: number = Number(req.query.limit);
        const order: number = Number(req.query.order);

        const filters = req.query;
        this.dao.getMeasurements(proposal_id, filters, page, limit, order).then((data: any) => {
          if (!data) {
            const result = { status: true, code: 200, message: "Not Found", data: data };
            resolve(result);
          } else {
            const result = { status: true, code: 200, message: "Found", data: data };
            resolve(result);
          }
        }).catch((error) => {
          reject(error);
        });

      }).catch((error) => {
        reject(error);
      });

    });
  }


  getScheduleOfRates = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {

      //validate query params
      Yup.object({
        search: Yup.string()
      }).validate(req.query).then(() => {
        const search = req.query.search as string;

        console.log(search);

        this.dao.getScheduleOfRates(search).then((data) => {

          const result = { status: true, code: 200, message: "Found", data: data };
          resolve(result);

        }).catch((error) => {
          reject(error);
        });


      }).catch((error) => {
        reject(error);
      });

    });
  }


  updateMeasurement = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const { data, user } = req.body;

      console.log(data);

      if (user.isJuniorEngineer()) {

        // validate measurement records
        MeasurementRecordValidation.measurementRecordUpdateValidationSchema.validate(data).then(() => {

          this.dao.updateMeasurement(data).then((daoResult) => {
            const result = { status: true, code: 200, message: "OK", data: daoResult };
            resolve(result);
          }).catch((error) => {
            reject(error);
          })

        }).catch((error) => {
          reject(error);
        });



      } else {
        reject(new Error("Measurements can be added by Junior Engineer only."));
      }


    });
  }

}

export default ProjectVerificationController;
