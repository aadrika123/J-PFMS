import express from "express";
import TestRoute from "./viizz_dev_test/ViizzDevTestRoute";
import ProjectVerificationRoute from "./project-management/ProjectVerificationRoute";
import { ContractorManagementRoute } from "./contract-management/contractor-management-route";


export default class ViizzDevApis{
    protected app;
    protected routeIdFrom;
    protected routeIdTo;
    protected nextRouteId;

    constructor(app: express.Application, routeIdFrom: number, routeIdTo: number){
        this.app = app;
        this.routeIdFrom = routeIdFrom;
        this.routeIdTo = routeIdTo;
        this.nextRouteId = routeIdFrom;
    }

    getNextRouteId(): number {
        if(this.nextRouteId <= this.routeIdTo) return this.nextRouteId++;
        throw new Error("ViizzDevApis ran out of route IDs");
    }

    register(): void {
        (new TestRoute(`${this.getNextRouteId()}`, "viizz-dev-test", this.app)).configure();
        (new ProjectVerificationRoute(`${this.getNextRouteId()}`, "project-verification", this.app)).configure();        
        (new ContractorManagementRoute(`${this.getNextRouteId()}`, this.app)).configure();
    }
}
