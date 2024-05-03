import express from "express";
import AuthRoute from "./route/auth/Auth";
import AuditTrailRoute from "./route/auditTrail/auditTrailRoute";
import BillsRoute from "./route/payments/ProjectPerposalsRoute";
import FileHandlerRoute from "./route/FileHandlerRoute";
// import BillVerificationRoute from "./route/payments/BillVerificationRoute";
import DashboardRoute from "./route/dashboard/dashboardRoute";

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

    (new AuthRoute()).configure(app, "43");  // 43

    (new AuditTrailRoute().configure(app, "48"));

    (new BillsRoute("50", app)).configure();

    // (new BillVerificationRoute("54", app).configure());

    (new DashboardRoute("55", app).configure());
  }
}

export default FinanceRoute;
