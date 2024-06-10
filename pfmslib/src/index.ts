"use strict";

import BankMasterValidation from "./validations/BankMasterValidation";
import { AccountingCodeType } from "./standard/accounting_code_types";
import { docType, executionBody } from "./lists/jsonList";
import {
  multiProjectProposalValidationSchema,
  projectProposalValidationSchema,
} from "./validations/ProjectProposalValidation";
import User from "./user/User";
import { ROLES } from "./user";
import { ProjectProposalStages } from "./standard/project_proposal_stages";
import {tenderDatasheetSchema} from "./validations/TenderInputFormValidation/TenderDatasheetValidation"
import {
  tenderBasicDetailsSchema,
  tenderBasicDetailsType,
} from "./validations/TenderInputFormValidation/TenderBasicDetailsValidation";
import {
  tenderCoverDetailsSchema,
  tenderCoverDetailsType,
} from "./validations/TenderInputFormValidation/TenderCoverDetailsValidation";
import {
  tenderWorkDetailsSchema,
  tenderWorkDetailsType,
} from "./validations/TenderInputFormValidation/TenderWorkDetailsValidation";
import { tenderFeeDetailsSchema, tenderFeeDetailsType } from "./validations/TenderInputFormValidation/TenderFeeDetailsValidation";
import { tenderCriticalDateSchema, tenderCriticalDatesType } from "./validations/TenderInputFormValidation/TenderCriticalDateValidation";
import { tenderBidDetailsSchema, tenderBidOpenersType } from "./validations/TenderInputFormValidation/TenderBidDetailsValidation";
import MeasurementRecordValidation from "./validations/MeasurementRecordValidation";

// escape input string for in regular expressions
const escapeRegExp = (text: string): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// format currency
const fc = (n: number) => {
  if (n == undefined || n == null) return "NaN";
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
};

export {
  escapeRegExp,
  fc,
  AccountingCodeType,
  BankMasterValidation,
  User,
  multiProjectProposalValidationSchema,
  projectProposalValidationSchema,
  ROLES,
  ProjectProposalStages,
  tenderDatasheetSchema,
  tenderBasicDetailsSchema,
  tenderBasicDetailsType,
  tenderCoverDetailsSchema,
  tenderCoverDetailsType,
  tenderWorkDetailsSchema,
  tenderWorkDetailsType,
  tenderFeeDetailsSchema,
  tenderFeeDetailsType,
  tenderCriticalDateSchema,
  tenderCriticalDatesType,
  tenderBidDetailsSchema,
  tenderBidOpenersType,
  docType,
  executionBody,
  MeasurementRecordValidation,
};
