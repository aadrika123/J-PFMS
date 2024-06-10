import express from "express";
import { APIv1 } from "../APIv1";
import DMSFileHandlerController from "../controller/dmsFileHandlerController";

class DMSFileHandlerRoute extends APIv1{
    private controller: DMSFileHandlerController;
    
    constructor(routeId: string, app: express.Application){
        super(routeId, app, "dms/file");
        this.controller = new DMSFileHandlerController();
    }

    configure(): void{
        this.addDMSUploadRoute('upload', this.controller.upload);
        this.addGetRoute('get/:referenceNo', this.controller.getFile);
        this.addDMSUploadRoute('upload/and-get', this.controller.uploadAndGetUrl);
    }
}

export default DMSFileHandlerRoute;