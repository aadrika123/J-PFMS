import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import project_proposalsDao from "../../dao/payments/ProjectPerposalDao";
import * as Yup from "yup";
import { projectProposalValidationSchema } from "pfmslib";
import { decryptV1 } from "../../../util/cryptographyV1";
import * as fs from "fs";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 15-04-2024
 */

class project_proposalsController {
  private dao: project_proposalsDao;
  constructor() {
    this.dao = new project_proposalsDao();
  }

  get = async (req: Request): Promise<APIv1Response> => {
    const query = req.query;

    // validate
    await Yup.object({
      ulb: Yup.number(),
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      search: Yup.string().optional(),
      order: Yup.number().oneOf([-1, 1], "Invalid value for order").optional(),
    }).validate(query);

    // collect input
    const ulb: number = Number(query.ulb);
    const page: number = Number(query.page);
    const limit: number = Number(query.limit);
    const search: string = query?.search ? String(query.search) : "";
    const order: number = query?.order ? Number(query.order) : -1;

    // call dao
    const data = await this.dao.get(ulb, page, limit, search, order);

    // return the result
    if (!data)
      return { status: true, code: 201, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  generateUniqueRandomID = (existing: string[]) => {
    const date = new Date();

    let id;
    do {
      const randomNumber = Math.floor(Math.random() * 1000);
      id = `${date.getFullYear()}${String(date.getMonth()+1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${randomNumber}`;
    } while (existing.includes(id));

    existing.push(id);
    return id;
  };

  create = async (req: Request): Promise<APIv1Response> => {
    //validate
    await projectProposalValidationSchema.validate(req.body.data);
    // req.body.data.wards=[1,2];

    // collect the input
    const record = req.body.data;

    const existingIDs: string[] = [];

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const rootDir = `./public/pdfs`;
    const relativeDir = `${year}/${month}/${day}`;
    const destDir = `${rootDir}/${relativeDir}`;

    // generate bill numbers
    record.proposed_date = new Date();
    record.project_proposal_no =
      "PPN-" + this.generateUniqueRandomID(existingIDs);

    if (record?.files) {
      console.log(record.files);
      const files = record.files;
      const docRecords = [];

      fs.mkdirSync(destDir, { recursive: true });

      let src = "";
      let dst = "";

      for (const file of files) {
        const fileDetails = JSON.parse(decryptV1(file.file_token));

        const relativePath = `${relativeDir}/${fileDetails.fileName}`;
        const destPath = `${rootDir}/${relativePath}`;

        src = fileDetails.path;
        dst = destPath;
        

        const docRecord = {
          description: file.file_name,
          path: relativePath,
          doc_type_id: file.document_type_id,
        };

        
        docRecords.push(docRecord);
      }
      delete record.files;

      await this.dao.createOne(record, docRecords);
      fs.renameSync(`./${src}`, dst);
    }
    

    // call dao
    // const result = await this.dao.create(data)

    return { status: true, code: 200, message: "Created", data: "OK" };
  };

  getById = async (req: Request): Promise<APIv1Response> => {
    //validate the input
    await Yup.object({
      id: Yup.number().required("id is required"),
    }).validate(req.params);

    //collect data

    const id: number = Number(req.params.id);

    //call dao
    const result: any[] = await this.dao.getById(id);

    //reaturn the result

    if (!result || result.length == 0)
      return { status: false, code: 200, message: "NOT FOUND", data: {} };

    return { status: true, code: 200, message: "OK", data: result };
  };

  update = async (req: Request): Promise<APIv1Response> => {
    //validate
    //  await projectProposalValidationSchema.validate(req.body.data);

    // collect the input
    const record = req.body.data;
    const id = Number(req.params.id);
    // req.body.data.wards=[1, 3];

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const rootDir = `./public/pdfs`;
    const relativeDir = `${year}/${month}/${day}`;
    const destDir = `${rootDir}/${relativeDir}`;

    // generate bill numbers
    record.proposed_date = new Date();

    const docRecords = [];
    if (record?.files && record.files.length > 0) {
      const files = record.files;

      fs.mkdirSync(destDir, { recursive: true });

      for (const file of files) {
        const fileDetails = JSON.parse(decryptV1(file.file_token));

        const relativePath = `${relativeDir}/${fileDetails.fileName}`;
        const destPath = `${rootDir}/${relativePath}`;

        fs.renameSync(`./${fileDetails.path}`, destPath);

        const docRecord = {
          description: file.file_name,
          path: relativePath,
          doc_type_id: file.document_type_id,
        };
        docRecords.push(docRecord);
      }

    }
    delete record.files;
    await this.dao.update(id, record, docRecords);

    // call dao
    // const result = await this.dao.create(data)

    return { status: true, code: 200, message: "Updated", data: "OK" };
  };
}

export default project_proposalsController;
