import { Application, Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import AuditTrail from "../../auditTrail/auditTrail";

class AuditTrailRoute {
    private auditTrail: AuditTrail;
    constructor(){
        this.auditTrail = new AuditTrail();
    }

    configure(app: Application, apiId: string){
        app.route(`${baseUrl}/audit-trails/get`).get((req: Request, res:Response) =>this.auditTrail.get(req, res, apiId + "01")) // 4801
        app.route(`${baseUrl}/audit-trails/report/get`).get((req: Request, res:Response) =>this.auditTrail.getPreviousMonthsData(req, res, apiId + "01"))  //4802
    }
}

export default AuditTrailRoute;