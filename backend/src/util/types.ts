import { Response } from "express";

type resObj = {
  action: string;
  apiId: string;
  version: string;
};

interface CandidateType {
  id: string;
  name: string;
  skills: string | string[];
  experience: string;
  profilePic?: string;
}

interface ApiResponse {
  json: any;
  responseCode: number;
  res: Response;
  status?: boolean | true;
}

interface VendorRequestData {
  vendor_type_id: number;
  vendor_no: string;
  name: string;
  mobile_no: string;
  tin_no: string;
  pan_no: string;
  bank_id: number;
  ifsc_code: string;
  department_id: number;
  email: string;
  contact_address: string;
  gst_no: string;
  aadhar_no: string;
  bank_account_no: string;
  bank_branch_name: string;
}

interface ChequebookRequestData {
  date: Date;
  issuer_name: string;
  bank_id: number;
  bank_account_no: string;
  cheque_no_from: string;
  user_id: number;
  bank_branch: string;
  page_count: number;
  cheque_no_to: string;
  cheque_book_return: boolean;
  cheque_book_return_date: Date;
  remarks?: string;
}

interface DirPaymentEntryRequestData {
  payment_date: string;
  payment_no: string;
  payment_type_id: number;
  payee_name_id: number;
  narration: string;
  grant_id: number;
  user_common_budget: boolean;
  adminis_ward_id: number;
  address: string;
  department_id: number;
  subledger_id: number;
  payment_mode: string;
  amount: number;
}

interface BillPaymentEntryRequestData {
  bill_no: string;
  bill_type_id: number;
  bill_entry_date: string;
  department_id: number;
  vendor_id: number;
  address: string;
  payee_id: number;
  adminis_ward_id: number;
  bill_amount: number;
  advance: number;
  deposit: number;
  deductions_amount: number;
  earlier_payment?: number;
  payable_amount?: number;
  net_amount?: number;
}
interface VoucherEntryRequestData {
  id?: number;
  voucher_no: string;
  voucher_date: Date;
  voucher_type_id: number;
  narration: string;
  department_id: number;
  adminis_ward_id: number;
  voucher_sub_id: number;
  sub_ledger_id: number;
  amount: number;
  dr_cr_id: number;
}

interface RequestNewAccCodeData {
  id?: number;
  ulb_id: number;
  request_no: string;
  employee_id: number;
  date: string;
  group_ref: string;
  code_ref: string;
  description: string;
}

export type {
  resObj,
  CandidateType,
  ApiResponse,
  VendorRequestData,
  ChequebookRequestData,
  DirPaymentEntryRequestData,
  BillPaymentEntryRequestData,
  VoucherEntryRequestData,
  RequestNewAccCodeData
};
