import { FormikHelpers } from "formik";
import { DirPaymentDataProps } from "../../components/JuidcoPfms/page/Transaction/DirectPaymentEntry/direct_payment_entry_types";
import { BillPaymentDetailsData } from "../../components/JuidcoPfms/page/Transaction/BillPaymentEntry/bill_payment_entry_types";
import { ChequeIssueEntryData } from "../../components/JuidcoPfms/page/Documentation/ChequeIssueEntry/cheque_issue_entry_types";
import { ReceiptDataProps } from "../../components/JuidcoPfms/page/Transaction/ReceiptEntry/receipt_entry_types";
import { ChequebookDataProps } from "../../components/JuidcoPfms/page/Masters/ChequebookMaster/chequebook_master_types";
import { BillInvoiceDetailsData } from "../../components/JuidcoPfms/page/Transaction/BillsInvoiceEntry/bills_invoice_entry_types";
import { ReceiptBudgetDetailsData } from "../../components/JuidcoPfms/page/Budgeting/ReceiptBudget/receipt_budget_types";
import { BudgetApproDetailsData } from "../../components/JuidcoPfms/page/Budgeting/BudgetAppro/budget_appro_types";
import { BudgetReApproDetailsData } from "../../components/JuidcoPfms/page/Budgeting/BudgetReAppro/budget_re_appro_types";
import { OpeningBalanceDetailsData } from "../../components/JuidcoPfms/page/Budgeting/OpeningBalance/opening_balance_types";
import { RevisedBudgetDetailsData } from "../../components/JuidcoPfms/page/Budgeting/RevisedBudget/revised_budget_types";
import { InvestmentsDetailsData } from "../../components/JuidcoPfms/page/Budgeting/Investments/investments_types";
import { GrantManagementDetailsData } from "../../components/JuidcoPfms/page/Budgeting/GrantManagement/grant_management_types";
// import { VoucherDataProps } from "@/components/JuidcoPfms/page/Documentation/CashBankReceiptVoucher/voucher_entry_types";

export interface FormikErrors {
  [key: string]: string | undefined;
}

export interface FormikTouched {
  [key: string]: boolean | undefined;
}

export interface Choice {
  key: string;
  value: string;
}

// Add Types Of All Form Data's
export type FormValues =
  | DirPaymentDataProps
  | BillPaymentDetailsData
  | ChequeIssueEntryData
  | ChequebookDataProps
  | ReceiptDataProps
  | BillInvoiceDetailsData
  | ReceiptBudgetDetailsData
  | BudgetApproDetailsData
  | BudgetReApproDetailsData
  | OpeningBalanceDetailsData
  | RevisedBudgetDetailsData
  | InvestmentsDetailsData
  | GrantManagementDetailsData;

type Data = {
  id: number;
  name: string;
};

export type FieldTypeProps = {
  CONTROL?:
    | "input"
    | "select"
    | "checkbox"
    | "textarea"
    | "radio"
    | "selectForNoApi";
  HEADER?: string;
  ACCESSOR?: string;
  PLACEHOLDER?: string;
  API?: string;
  OPTIONS?: Choice[];
  TYPE?: string;
  ADDITIONAL?: FieldTypeProps[];
  TITLE?: string;
  CHILDRENS?: FieldTypeProps[];
  DATA?: Data[];
  HANDLER?: (id: number | string) => void;
  VISIBILITY?: boolean | true;
  READONLY?: boolean | false;
  VALUE?: string | number | boolean;
};

export interface FormikWrapperProps {
  initialValues: FormValues;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (values: FormValues, actions?: FormikHelpers<FormValues>) => void;
  fields: FieldTypeProps[];
  readonly?: boolean;
  onClose?: () => void;
  title: string;
  resetInitialValue?: () => void;
}
