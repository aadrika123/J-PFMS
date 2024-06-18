/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type PfmsUrlKeys =
  | "MUNICIPILATY_CODE_URL"
  | "AUTH_URL"
  | "PROJECT_VERIFICATION"
  | "DASHBOARD"
  | "ULB_URL"
  | "WARD_URL"
  | "DISTRICT_URL"
  | "STATE_URL"
  | "FILE_UPLOAD_URL"
  | "PROJ_RPOPOSAL_URL"
  | "TENDER_FORM"
  | "TENDER_WORK"
  | "TENDER_COVER"
  | "TENDER_BASIC"
  | "TENDER_FEE"
  | "TENDER_CRITICAL_DATES"
  | "TENDER_BID_OPENERS";

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
    getDepartments?: string;
    getType?: string;
    getAllDetails?: string;
    submit?: string;
    getProjectProposalById?: string;
    forward?: string;
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
    getDepartments: "ulb/department/get"
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
    getType: "/project-type/get-all"
  },
  PROJECT_VERIFICATION: {
    getById: "project-verification/get",
    approve: "project-verification/approve",
    sendBack: "project-verification/send-back",
    getDoc: "project-verification/document/get",
    approveDoc: "project-verification/document/approve",
    rejectDoc: "project-verification/document/reject",
  },
  DASHBOARD: {
    getCollection: "dashboard/collection/get",
    getTopRevenueModules: "dashboard/revenue-modules/get",
    getTopUlb: "dashboard/ulbs/get",
    getTopPaymentMode: "dashboard/payment-modes/get",
  },
  TENDER_FORM:{
    create: "tender/datasheet/create",
    getAllDetails: "tender/datasheet/get",
    submit: "tender/datasheet/update",
    getById: "tender/datasheet/get-by-id",
    getProjectProposalById: "tender/datasheet/project-proposal/get",
    forward: "tender/datasheet/forward",
    sendBack: "tender/datasheet/send-back"
  },
  TENDER_BASIC:{
    getById: "tender/basic-details/get",
    create :"tender/basic-details/create"
  },
  TENDER_COVER:{
    getById: "tender/cover-details/get",
    create :"tender/cover-details/create"
  },
  TENDER_WORK:{
    getById: "tender/work-details/get",
    create :"tender/work-details/create"
  },
  TENDER_FEE:{
    getById: "tender/fee-details/get",
    create :"tender/fee-details/create"
  },
  TENDER_CRITICAL_DATES:{
    getById: "tender/critical-dates/get",
    create :"tender/critical-dates/create"
  },
  TENDER_BID_OPENERS:{
    getById: "tender/bid-openers/get",
    create :"tender/bid-openers/create"
  }
};
