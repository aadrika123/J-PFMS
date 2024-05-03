import { APIv1Response } from "../../APIv1";
import DashboardDao from "../../dao/dashboard/dashboardDao";

/**
 * | Author- Sanjiv
 * | Created On- 28-04-2024
 */

class DashboardController {
  private dao: DashboardDao;
  constructor() {
    this.dao = new DashboardDao();
  }

  getCollection = async (): Promise<APIv1Response> => {
    const data = await this.dao.getCollection();

    if (!data)
      return { status: true, code: 200, message: "Not Found", data: data };
    return { status: true, code: 200, message: "Found", data: data };
  };

  getTopRevenueModules = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTopRevenuModules();

    if (!data)
      return { status: true, code: 200, message: "Revenue Module Not Found", data: data };
    return { status: true, code: 200, message: "Revenue Module Found", data: data };
  };

  getTopUlbs = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTopUlbs();

    if (!data)
      return { status: true, code: 200, message: "Ulb Not Found", data: data };
    return { status: true, code: 200, message: "Ulb Found", data: data };
  };

  getTopPaymentModes = async (): Promise<APIv1Response> => {
    const data = await this.dao.getTopPaymentMode();

    if (!data)
      return { status: true, code: 200, message: "Payment Mode Not Found", data: data };
    return { status: true, code: 200, message: "Payment Mode Found", data: data };
  };

}

export default DashboardController;
