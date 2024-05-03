/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type FinanceUrlKeys =
  | "MUNICIPILATY_CODE_URL"
  | "AUTH_URL"
  | "BILLS_VERIFICATION"
  | "DASHBOARD";

type Urls = {
  [key in FinanceUrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    getById?: string;
    login?: string;
    approve?: string,
    sendBack?: string,
    getDoc?: string,
    approveDoc?: string,
    rejectDoc?: string,
    getCollection?: string
    getTopRevenueModules?: string,
    getTopUlb?: string,
    getTopPaymentMode?: string,
  };
};

export const FINANCE_URL: Urls = {
  AUTH_URL: {
    login: "/auth/login",
  },
  MUNICIPILATY_CODE_URL: {
    get: "/get-all-munci-code",
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
