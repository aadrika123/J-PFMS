import express from "express";
import TestRoute from "./viizz_dev_test/ViizzDevTestRoute";
import ProjectManagementRoute from "./project-management/ProjectManagementRoute";


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
        (new ProjectManagementRoute(`${this.getNextRouteId()}`, "project-management", this.app)).configure();
    }
}
