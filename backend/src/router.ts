import express from "express";
import AuthRoute from "./apis/route/auth/Auth";
import BillsRoute from "./apis/route/payments/ProjectPerposalsRoute";
import FileHandlerRoute from "./apis/route/FileHandlerRoute";
// import BillVerificationRoute from "./route/payments/BillVerificationRoute";
import DashboardRoute from "./apis/route/dashboard/dashboardRoute";
import DistrictRoute from "./apis/route/masters/districtRoute";
import StateRoute from "./apis/route/masters/stateRoute";
import UlbRoute from "./apis/route/masters/ulbRoute";

/*
|--------------------------------------------------------------------------
| API Routes
| Author- Sanjiv Kumar
| Created On- 20-01-2024 
| Created for- juidco_finance
| Module status- Open
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/
/**
 * | Comman Route for finance
 */

class FinanceRoute {

  constructor(app: express.Application) {

    (new FileHandlerRoute("0", app)).configure();

    (new AuthRoute()).configure(app, "1");  // 1

    (new DistrictRoute("2", app)).configure();  // 2

    (new StateRoute("3", app)).configure();  // 3

    (new UlbRoute("4", app)).configure();  // 3


    (new BillsRoute("50", app)).configure();

    // (new BillVerificationRoute("54", app).configure());

    (new DashboardRoute("55", app)).configure();

  }
}

export default FinanceRoute;
