import { Request } from "express";
import { APIv1Response } from "../../APIv1";
import project_proposalsDao from "../../dao/payments/ProjectPerposalDao";
import * as Yup from "yup";
import { projectProposalEntryValidationSchema } from "pfmslib";
import { decryptV1 } from "../../../util/cryptographyV1";
import * as fs from 'fs';

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
      ulb: Yup.number().required("ulb is required"),
      date: Yup.string().required().matches(/^\d{4}[-]\d{2}[./-]\d{2}$/, "Date must be in YYYY-MM-DD format"),
      page: Yup.number().required("page is required."),
      limit: Yup.number().required("limit is required."),
      search: Yup.string().optional(),
      order: Yup.number().oneOf([-1, 1], "Invalid value for order").optional(),

    }).validate(query);

    // collect input
    const ulb: number = Number(query.ulb);
    const date: string = query.date as string;
    const page: number = Number(query.page);
    const limit: number = Number(query.limit);
    const search: string = query?.search ? String(query.search) : "";
    const order: number = query?.order ? Number(query.order) : -1;


    // call dao
    const data = await this.dao.get(ulb, date, page, limit, search, order);

    // return the result
    if (!data) return { status: true, code: 201, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };


  generateUniqueRandomID = (existing: string[]) => {
    const millis = new Date().getTime();

    let id;
    do {
      const randomNumber = Math.floor(Math.random() * 1000000000);
      id = `${millis}-${randomNumber}`;
    } while (existing.includes(id));

    existing.push(id);
    return id;
  }

  create = async (req: Request): Promise<APIv1Response> => {
    //validate
    await projectProposalEntryValidationSchema.validate(req.body.data);

    // collect the input
    const data = req.body.data;


    const existingIDs: string[] = [];

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();


    const rootDir = `./public/pdfs`;
    const relativeDir = `${year}/${month}/${day}`;
    const destDir = `${rootDir}/${relativeDir}`;

    
    // generate bill numbers
    await data.forEach(async (record: any) => {
      record.bill_date = new Date(record.bill_date);
      record.bill_no = 'BN-' + this.generateUniqueRandomID(existingIDs);
      console.log(record.bill_no);

      if (record?.files) {
        console.log(record.files);
        const files = record.files;
        const docRecords = [];

        fs.mkdirSync(destDir, { recursive: true });

        for (const key in files) {
          const fileDetails = JSON.parse(decryptV1(files[key]));
          
          const relativePath = `${relativeDir}/${fileDetails.fileName}`;
          const destPath = `${rootDir}/${relativePath}`;
          
          fs.renameSync(`./${fileDetails.path}`, destPath);

          const docRecord = {
            description: key,
            path: relativePath
          }
          docRecords.push(docRecord);
        }

        console.log(docRecords);
        delete record.files;

        await this.dao.createOne(record, docRecords);
      }
    });

    // call dao
    // const result = await this.dao.create(data);


    return { status: true, code: 200, message: "Created", data: "OK" }
  }


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
        return {status: false, code: 200, message: "NOT FOUND", data: {}};
      
    return {status: true, code: 200, message: "OK", data: result[0]};
  
  }

}

export default project_proposalsController;
