import * as Yup from "yup"
import { tenderBasicDetailsSchema } from "./TenderBasicDetailsValidation"
import { tenderCoverDetailsSchema } from "./TenderCoverDetailsValidation"
import { tenderWorkDetailsSchema } from "./TenderWorkDetailsValidation"
import { tenderFeeDetailsSchema } from "./TenderFeeDetailsValidation"
import { tenderBidDetailsSchema } from "./TenderBidDetailsValidation"
import { tenderCriticalDateSchema } from "./TenderCriticalDateValidation"

 export const tenderDatasheetSchema = Yup.object({
    basic_details: tenderBasicDetailsSchema,
    cover_details: tenderCoverDetailsSchema,
    work_details: tenderWorkDetailsSchema,
    fee_details: tenderFeeDetailsSchema,
    bid_openers_details: tenderBidDetailsSchema,
    critical_dates: tenderCriticalDateSchema
 })