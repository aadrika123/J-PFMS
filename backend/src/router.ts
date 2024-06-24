import express from "express";
import AuthRoute from "./apis/route/auth/Auth";
import BillsRoute from "./apis/route/projectProposal/ProjectPerposalsRoute";
import FileHandlerRoute from "./apis/route/FileHandlerRoute";
// import BillVerificationRoute from "./route/payments/BillVerificationRoute";
import DashboardRoute from "./apis/route/dashboard/dashboardRoute";
import DistrictRoute from "./apis/route/masters/districtRoute";
import StateRoute from "./apis/route/masters/stateRoute";
import UlbRoute from "./apis/route/masters/ulbRoute";
import ProjectTypeRoute from "./apis/route/masters/projectTypeRoute";
import TenderBasicDetailsRoute from "./apis/route/tenderDatasheet/tenderBasicDetailsRoute";
import TenderDatasheetsRoute from "./apis/route/tenderDatasheet/tenderDatasheetsRoute";
import TenderCoverDetailsRoute from "./apis/route/tenderDatasheet/tenderCoverDetailsRoute";
import TenderWorkDetailsRoute from "./apis/route/tenderDatasheet/tenderWorkDetailsRoute";
import TenderFeeDetailsRoute from "./apis/route/tenderDatasheet/tenderFeeDetailsRpoute";
import TenderCriticalDatesRoute from "./apis/route/tenderDatasheet/tenderCriticalDatesRoute";
import TenderBidOpenersRoute from "./apis/route/tenderDatasheet/tenderBidOpenersRoute";
import DMSFileHandlerRoute from "./apis/route/dmsFileHandlerRoute";
import PreparedEstimatedRoute from "./apis/prepared-estimated/PreparedEstimatedRoute";
import AwardedTenderRoute from "./apis/route/awardedTender/awardedTenderRoute";
import AwardedProjectDetailsRoute from "./apis/route/awardedTender/awardedProjectDetailsRoute";
import AwardedTenderDetailsRoute from "./apis/route/awardedTender/awardedTenderDetailsRoute";
import AwardedProjectDurationRoute from "./apis/route/awardedTender/awardedProjectDurationsRoute";
import AwardedBoqsRoute from "./apis/route/awardedTender/awardedBoqsRoute";
import AwardedProjectMilestonesRoute from "./apis/route/awardedTender/awardedProjectMilestonesRoute";

/*
|--------------------------------------------------------------------------
| API Routes
| Author- Sanjiv Kumar
| Created On- 20-01-2024 
| Created for- juidco_pfms
| Module status- Open
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
|
*/
/**
 * | Comman Route for pfms
 */

class PFMSRoute {
  constructor(app: express.Application) {
    new FileHandlerRoute("0", app).configure();

    new AuthRoute().configure(app, "1"); // 1

    new DistrictRoute("2", app).configure(); // 2

    new StateRoute("3", app).configure(); // 3

    new UlbRoute("4", app).configure(); // 4

    new ProjectTypeRoute("5", app).configure(); // 5

    new TenderDatasheetsRoute("6", app).configure(); //6

    new TenderBasicDetailsRoute("7", app).configure(); //7

    new TenderCoverDetailsRoute("8", app).configure(); //8

    new TenderWorkDetailsRoute("9", app).configure(); //9

    new TenderFeeDetailsRoute("10", app).configure(); //10

    new TenderCriticalDatesRoute("11", app).configure(); //11

    new TenderBidOpenersRoute("12", app).configure(); //12

    new DMSFileHandlerRoute("13", app).configure(); //13

    new AwardedTenderRoute("14", app).configure(); //14

    new AwardedProjectDetailsRoute("15", app).configure(); //15

    new AwardedTenderDetailsRoute("16", app).configure(); //16

    new AwardedProjectDurationRoute("17", app).configure(); //17

    new AwardedBoqsRoute("18", app).configure(); //18

    new AwardedProjectMilestonesRoute("19", app).configure(); //19

    new BillsRoute("50", app).configure();

    // (new BillVerificationRoute("54", app).configure());

    new DashboardRoute("55", app).configure();
    new PreparedEstimatedRoute("56", app).configure();
  }
}

export default PFMSRoute;
