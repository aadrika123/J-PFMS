/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type PfmsUrlKeys =
  | "MUNICIPILATY_CODE_URL"
  | "AUTH_URL"
  | "BILLS_VERIFICATION"
  | "DASHBOARD"
  | "ULB_URL"
  | "WARD_URL"
  | "DISTRICT_URL"
  | "STATE_URL"
  | "FILE_UPLOAD_URL"
  | "PROJ_RPOPOSAL_URL";

type Urls = {
  [key in PfmsUrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    getById?: string;
    login?: string;
    approve?: string;
    sendBack?: string;
    getDoc?: string;
    approveDoc?: string;
    rejectDoc?: string;
    getCollection?: string;
    getTopRevenueModules?: string;
    getTopUlb?: string;
    getTopPaymentMode?: string;
    upload?: string;
    getByAuth?: string;
    getByUlb?: string;
  };
};

export const PFMS_URL: Urls = {
  AUTH_URL: {
    login: "/auth/login",
  },
  MUNICIPILATY_CODE_URL: {
    get: "/get-all-munci-code",
  },
  STATE_URL: {
    get: "/state/get/jharkhand",
  },
  ULB_URL: {
    get: "/ulb/get-by-district",
    getById: "/ulb/get",
  },
  WARD_URL: {
    get: "/ulb/ward/get",
  },
  DISTRICT_URL: {
    get: "/district/get",
  },
  FILE_UPLOAD_URL: {
    upload: "/file-handler/upload-single-doc",
  },
  PROJ_RPOPOSAL_URL: {
    get: "/project-perposal/get-all",
    create: "/project-perposal/create",
    update: "/project-perposal/update",
    getById: "/project-perposal/get",
  },
  BILLS_VERIFICATION: {
    getById: "bill-verification/get",
    approve: "bill-verification/approve",
    sendBack: "bill-verification/send-back",
    getDoc: "bill-verification/document/get",
    approveDoc: "bill-verification/document/approve",
    rejectDoc: "bill-verification/document/reject",
  },
  DASHBOARD: {
    getCollection: "dashboard/collection/get",
    getTopRevenueModules: "dashboard/revenue-modules/get",
    getTopUlb: "dashboard/ulbs/get",
    getTopPaymentMode: "dashboard/payment-modes/get",
  },
};
