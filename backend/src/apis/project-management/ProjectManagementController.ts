import { APIv1Response } from "../APIv1";
import { Request } from "express";
import ProjectManagementDao from "./ProjectManagementDao";
import * as Yup from "yup";
import { ProjectProposalStages } from "pfmslib";



class ProjectManagementController {
  private dao: ProjectManagementDao;
  constructor() {
    this.dao = new ProjectManagementDao();
  }

  get =  async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      // validate
      Yup.object({
        proposalId: Yup.number().required(),
      }).validate(req.params).then(() => {
        // collect data
        const proposalId = Number(req.params.proposalId);
        // call dao
        this.dao.get(proposalId).then((data)=>{
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

        console.log(req.query);

        // call dao
        this.dao.getAll(req.query, page, limit, order).then((data: any) => {
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


    getInbox = async (req: Request): Promise<APIv1Response> => {


      console.log("Inbox");
      return new Promise((resolve, reject) => {

        const user = req.body.user;

        if (user.isExecutiveOfficer()) {
          console.log("Executive officer Inbox");

          this.commonCallFunction(
            req,
            ProjectProposalStages.ApprovedByBackOffice,
            this.dao.getLevel0ExecutiveOfficerInbox
          ).then((data: any) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          })

        } else if (user.isCityManager()) {
          console.log("City Manager");
          reject("City Manager inbox Not supported Yet!");
        }else{
          console.log(user.getRole());
          reject(`${user.getRole()} inbox is not supported yet`);
        }
      });
    }

    getOutbox = async (req: Request): Promise<APIv1Response> => {
      return new Promise((resolve, reject) => {
        const user = req.body.user;
        if(user.isExecutiveOfficer()) {
          console.log("Executive Officer Output");
          
          this.commonCallFunction(req, ProjectProposalStages.ApprovedByBackOffice, this.dao.getHigherLevelOutbox)
          .then((data: any) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          })

        } else if (user.isCityManager()) {
          console.log("City Manager");
          reject("City Manager Outbox Not supported Yet!");
        }else{
          console.log(user.getRole());
          reject(`${user.getRole()} outbox is not supported yet`);
        }
      });
    }


    getArchive = async (req: Request): Promise<APIv1Response> => {
      return new Promise((resolve, reject) => {
        const user = req.body.user;
        if(user.isExecutiveOfficer()) {
          console.log("Executive Officer Archive");
          
          this.commonCallFunction(req, ProjectProposalStages.ApprovedByBackOffice, this.dao.getHigherLevelOutbox)
          .then((data: any) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          })

        } else if (user.isCityManager()) {
          console.log("City Manager");
          reject("City Manager Outbox Not supported Yet!");
        }else{
          console.log(user.getRole());
          reject(`${user.getRole()} outbox is not supported yet`);
        }
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
        }).catch((error) =>{
          reject(error);
        });
      });
    }

  }

export default ProjectManagementController;
