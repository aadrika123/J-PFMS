import { APIv1Response } from "../APIv1";
import { Request } from "express";
import ProjectVerificationDao from "./ProjectVerificationDao";
import * as Yup from "yup";
import { MeasurementRecordValidation, } from "pfmslib";
import { decryptV1, encryptV1 } from "../../util/cryptographyV1";



import fs from "fs";
import crypto from 'crypto';
import axios from 'axios';
import FormData from 'form-data';


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

  getAll11 = async (req: Request): Promise<APIv1Response> => {

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
        this.dao.getAll11(filters, page, limit, order).then((data: any) => {
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
    return new Promise((resolve, reject) => {
      const { data, user } = req.body;

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

        const roles = user.getRoles();



        this.dao.getInbox(query, ulbId, page, limit, order, roles).then((data) => {

          const result = { status: true, code: 200, message: "Found", data: data };
          resolve(result);

        }).catch((error) => {
          reject(error);
        });



      }).catch((error) => {
        reject(error);
      })

    });
  }



  getReturnedBackItems = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const { data, user } = req.body;

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

        const roles = user.getRoles();



        this.dao.getReturnedProposals(query, ulbId, page, limit, order, roles).then((data) => {

          const result = { status: true, code: 200, message: "Found", data: data };
          resolve(result);

        }).catch((error) => {
          reject(error);
        });



      }).catch((error) => {
        reject(error);
      })

    });
  }


  getOutbox = async (req: Request): Promise<APIv1Response> => {

    return new Promise((resolve, reject) => {
      const { data, user } = req.body;
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

        const roles = user.getRoles();



        this.dao.getOutbox(query, ulbId, page, limit, order, roles).then((data) => {

          const result = { status: true, code: 200, message: "Found", data: data };
          resolve(result);

        }).catch((error) => {
          reject(error);
        });



      }).catch((error) => {
        reject(error);
      })

    });
  }


  getFullyApproved = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      const { data, user } = req.body;

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

        const roles = user.getRoles();



        this.dao.getFullyApproved(query, ulbId, page, limit, order, roles).then((data) => {

          const result = { status: true, code: 200, message: "Found", data: data };
          resolve(result);

        }).catch((error) => {
          reject(error);
        });



      }).catch((error) => {
        reject(error);
      })

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



  forwardProposal = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      // validate
      const { data, user } = req.body;
      Yup.object({
        proposalId: Yup.number().required("proposalId is required"),
      }).validate(data).then(() => {

        this.dao.forwardProposal(user, data).then((result) => {
          const d = { status: true, code: 200, message: "Success", data: result };
          resolve(d);
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });


    });
  }


  sendBackProposal = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      // validate
      const { data, user } = req.body;
      Yup.object({
        proposalId: Yup.number().required("proposalId is required"),
      }).validate(data).then(() => {
        this.dao.sendBackProposal(user, data).then((result) => {
          const d = { status: true, code: 200, message: "Success", data: result };
          resolve(d);
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });


    });
  }



  // sendBackProposal = (req: Request): Promise<APIv1Response> => {

  //   console.log("====================================================");
  //   return new Promise((resolve, reject) => {
  //     // validate
  //     const { data, user } = req.body;
  //     console.log("user =======================================", user);
  //     console.log(data);

  //     let approval_stage_id: number = ProjectProposalStages.ApprovedByJuniorEngineer;

  //     Yup.object({
  //       proposalId: Yup.number().required("proposalId is required"),
  //     }).validate(data).then(() => {

  //       this.dao.getLastProposalCheckingRecordByProposalId(
  //         data?.proposalId
  //       ).then((lastRecord) => {

  //         console.log("lastrecord", lastRecord);

  //         if (!lastRecord && !user.isJuniorEngineer()) {
  //           reject(new Error("You are not allowed to to send back the proposal"));
  //         } else {
  //           if (user.isJuniorEngineer())
  //             approval_stage_id = ProjectProposalStages.ApprovedByBackOffice;
  //           else if (user.isAssistantEngineer())
  //             approval_stage_id = ProjectProposalStages.ApprovedByAssistantEngineer;

  //           const reqData = {
  //             project_proposal_id: data?.proposalId,
  //             checker_id: user?.getUserId(),
  //             comment: data?.comment,
  //             approval_stage_id: approval_stage_id,
  //           };

  //           console.log("reqData", reqData);

  //           this.dao.sendBackProposal(reqData).then((result) => {
  //             const d = { status: true, code: 200, message: "Success", data: result };
  //             resolve(d);
  //           }).catch((error) => {
  //             reject(error);
  //           });
  //         }

  //       }).catch((error) => {
  //         reject(error);
  //       });



  //     }).catch((error) => {
  //       reject(error);
  //     });


  //   });
  // }


  measurementRecordingTask = async (req: Request) => {
    const { data, user } = req.body;

    console.log("data", data);

    if (!user.isJuniorEngineer()) throw new Error("Measurements can be added by Junior Engineer only.");

    // validate measurement records
    await Yup.array(MeasurementRecordValidation.measurementRecordValidationSchema).validate(data.records);

    // decrypt the file tokens
    const ref_docs: string[] = [];
    if (data?.ref_docs) {
      console.log("ref docs", data.ref_docs);
      data.ref_docs.forEach((doc_token: string) => {

        const details = decryptV1(doc_token);
        if (details.length == 0)
          throw new Error("Invalid File Token");

        ref_docs.push(JSON.parse(details));
      });
    }

    // upload the files to dms and prepare document records for the database
    const ref_doc_records: any[] = [];
    if (ref_docs.length > 0) {
      console.log(ref_docs);
      // send the documents to the dms
      console.log("Has documents.");

      for (let i = 0; i < ref_docs.length; i++) {
        const doc: any = ref_docs[i];


        // compute file hash
        console.log(doc?.path);
        const buffer = fs.readFileSync(doc?.path)
        console.log("File size: ", buffer.length);
        const hashed = crypto.createHash('SHA256').update(buffer).digest('hex');
        console.log(hashed);


        // send the file to DMS
        const formData = new FormData();
        formData.append('file', buffer, doc?.mimeType);
        formData.append('tags', doc?.originalName.substring(0, 7));

        const headers = {
          "x-digest": hashed,
          "token": "8Ufn6Jio6Obv9V7VXeP7gbzHSyRJcKluQOGorAD58qA1IQKYE0",
          "folderPathId": 1,
          ...formData.getHeaders(),
        }

        const dmsResponse = await axios.post(process.env.DMS_UPLOAD || '', formData, { headers });
        console.log(dmsResponse.data, "dms Response data");

        const dmsResponseData = dmsResponse.data;
        if (!dmsResponseData.status) throw new Error("Error uploading document.");

        const d = dmsResponseData.data;

        // also fetch the full URL of the file

        const headers2 = {
          "token": "8Ufn6Jio6Obv9V7VXeP7gbzHSyRJcKluQOGorAD58qA1IQKYE0",
        }
        const dmsDocDetailResponse = await axios.post(process.env.DMS_DOC_DETAILS || '', { referenceNo: d.ReferenceNo }, { headers: headers2, params: { referenceNo: d.ReferenceNo } });
        console.log(dmsDocDetailResponse.data, "dmsDocDetailReponse");

        const dmsDocDetailResponseData = dmsDocDetailResponse.data;
        if(! dmsDocDetailResponseData.status) throw new Error("Error getting document details from DMS");

        const docD = dmsDocDetailResponseData.data;

        

        ref_doc_records.push({
          proposal_id: data.records[0].proposal_id,
          doc_ref_no: d.ReferenceNo,
          doc_unique_id: d.uniqueId,
          doc_url: docD.fullPath
        });

      }
    }

    console.log(ref_doc_records, "ref doc records");

    const daoResult = await this.dao.recordMeasurements(data.records, ref_doc_records);
    return daoResult;
  }



  recordMeasurements = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      this.measurementRecordingTask(req).then((data) => {
        resolve({ status: false, code: 200, message: "OK", data: data });
      }).catch((error) => {
        reject(error);
      });

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

        }).catch((error: any) => {
          reject(error);
        });



      } else {
        reject(new Error("Measurements can be added by Junior Engineer only."));
      }


    });
  }



  getComments = (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {

      //validate
      Yup.object({
        proposalId: Yup.number().required("proposal id is required")
      }).validate(req.params).then(() => {

        const p = req.params;
        this.dao.getComments(Number(p.proposalId)).then((data) => {
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


  referenceDocUploadTask = async (req: Request) => {
    // console.log(req.headers);
    console.log(req.files);

    if (!req.files) throw new Error("Could not find the document.");

    const files: any = req.files as any;
    if (!files['doc' as keyof typeof files]) throw new Error("Required document not found.");

    const pdfFile = files['doc'][0];
    console.log(pdfFile);

    // validate
    await MeasurementRecordValidation.MeasurementReferenceDocValidation.validate({
      name: pdfFile.originalname,
      type: pdfFile.mimetype,
      size: pdfFile.size
    });

    const details = {
      path: pdfFile.path,
      originalName: pdfFile.originalname,
      fileName: pdfFile.filename,
      mimeType: pdfFile.mimetype
    };

    const result = { status: true, code: 200, message: "OK", data: { "file_token": encryptV1(JSON.stringify(details)) } };
    return result;

  }


  referenceDocUpload = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      this.referenceDocUploadTask(req).then((data) => {
        resolve(data);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }


  getReferenceDocListTask = async (req: Request) => {
    await Yup.object({
      proposalId: Yup.number().required("proposal_id is required"),
    }).validate(req.query);

    const { proposalId } = req.query;

    const data = await this.dao.getReferenceDocList(
      Number(proposalId)
    );


    return { status: true, code: 200, message: "OK", data: data };
  }

  getReferenceDocList = async (req: Request): Promise<APIv1Response> => {
    return new Promise((resolve, reject) => {
      this.getReferenceDocListTask((req)).then((data) => {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getDocumentList = async (req: Request): Promise<APIv1Response> => {
    await Yup.object({
      proposalId: Yup.number().required("proposal_id is required"),
    }).validate(req.query);
    const { proposalId } = req.query;
    const data = await this.dao.getDocumentList(
      Number(proposalId)
    );
    return { status: true, code: 200, message: "OK", data: data };
  }
}

export default ProjectVerificationController;
