import express, { Request, Response } from "express";
import multerUpload from "./middleware/_multer";
import { User } from "pfmslib";



/**
 * | Author: Bijoy Paitandi
 * | Description: Acts as a API wrapper, calls the controller function and formats the output, provides extra API metadata,
 * |              logs the errors if any. 
 * | Status: Close
 */


export interface APIv1Response {
  status: boolean;
  code: number;
  message: string;
  data: any;
}

export class APIv1_New {

  protected apiVersion = "v1";
  protected baseUrl;
  protected routeId;
  protected app;
  protected routeName;
  protected apiCount = 0;

  constructor(routeId: string, app: express.Application, routeName: string) {
    this.routeId = routeId.padStart(3, "0");
    this.app = app;
    this.routeName = routeName;
    this.baseUrl = `${process.env.BASE_URL}/${this.apiVersion}/${this.routeName}`;
  }

  addGetRoute(path: string, handler: (req: Request) => Promise<APIv1Response>): void {
    const apiId = this.generateAPIId();
  
    this.app.route(`${this.baseUrl}/${path}`)
      .get((req: Request, res: Response) => this.apiWrapper(req, res, apiId, handler));
  }

  addPostRoute(path: string, handler: (req: Request) => Promise<APIv1Response>): void {
    
    const apiId = this.generateAPIId();
    this.app.route(`${this.baseUrl}/${path}`)
      .post((req: Request, res: Response) => this.apiWrapper(req, res, apiId, handler));
  }

  addFormDataPostRoute(path: string, handler: (req: Request) => Promise<APIv1Response>, fields: any[]): void {
    const apiId = this.generateAPIId();
    
    this.app.route(`${this.baseUrl}/${path}`)
      .post(async (req: Request, res: Response) => {
        multerUpload.fields(fields)(req, res, () => {
          this.apiWrapper(req, res, apiId, handler);
        });
      });
  }

  private generateAPIId = () => {
    return `${this.routeId}` + `${++this.apiCount}`.padStart(3, "0");
  }

  protected apiWrapper = async (req: Request, res: Response, apiId: string, handler: (req: Request) => Promise<APIv1Response>): Promise<Response> => {

    return new Promise((resolve) => {
      console.log(`api call (${req.path})`);

      // console.log(req.body.auth);
      const user = new User(req.body.auth);
      req.body.user = user;

      // invoke the before-middlewares if any

      handler(req).then((result: APIv1Response) => {
        // invoke the after-middlewares if any
        console.log("api finished");
        if (result.code == 500) {
          console.log(result);
        }

        const finalResponse = {
          ...result,
          "meta-data": {
            apiId: apiId,
            version: this.apiVersion,
            action: req.method,
          },
        };
        res.status(result.code).json(finalResponse);
        resolve(res);
      }).catch((err: any) => {

        // log the err object and other information

        // extract the error message and send to frontend
        const error = err as Error;

        console.log(error);

        const finalResponse = {
          status: false,
          data: error.message,
          "meta-data": {
            apiId: apiId,
            version: this.apiVersion,
            action: req.method,
          },
        };
        res.status(200).json(finalResponse);
        resolve(res);
      });
    });
  }
}