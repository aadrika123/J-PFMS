'use strict';

import BankMasterValidation from "./validations/BankMasterValidation";
import { AccountingCodeType } from "./standard/accounting_code_types";
import BalanceTrackingsValidation from "./validations/BalanceTrackingsValidation";
import { multiProjectProposalEntryValidationSchema, projectProposalEntryValidationSchema } from "./validations/ProjectProposalEntryValidation";
import User from "./user/User";
import {ROLES} from "./user";
import {ProjectProposalStages} from "./standard/project_proposal_stages"

// escape input string for in regular expressions
const escapeRegExp = (text:string):string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


// format currency
const fc = (n: number) => {
  if(n == undefined || n == null)
     return  "NaN";
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR'
  });
}


export {
  escapeRegExp,
  fc,
  AccountingCodeType,
  BankMasterValidation,
  BalanceTrackingsValidation,
  User,
  multiProjectProposalEntryValidationSchema,
  projectProposalEntryValidationSchema,
  ROLES,
  ProjectProposalStages
};
