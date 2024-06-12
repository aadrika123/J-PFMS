import * as Yup from "yup";

///////// TenderBasicDetailsType ///////////
type file = {
  file_name: string;
  size: string;
  path: string;
};


export type tenderBasicDetailsType = {
  tender_datasheet_id: number;
  reference_no: string;
  tender_type: string;
  contract_forms: string[];
  tender_categories: string[];
  allow_resubmission: boolean;
  allow_withdrawal: boolean;
  allow_offline_submission: boolean;
  payment_mode: string;
  bank_id: number;
  file: file;
  instrument?: string;
};

///////// Tender Basic Details Schema //////////
export const tenderBasicDetailsSchema = Yup.object({
  tender_datasheet_id: Yup.number().required("tender datasheet id is required"),
  reference_no: Yup.string().required("reference is required"),
  tender_type: Yup.string().required("tender type is required"),
  contract_forms: Yup.array()
    .required("contract form is required")
    .test("contract_forms", (value, validationContext) => {
      const { createError } = validationContext;
      if (!value.length) {
        return createError({
          message: "contract form is required",
        });
      }
      return true;
    }),
  tender_categories: Yup.array()
    .required("tender category is required")
    .test("tender_categories", (value, validationContext) => {
      const { createError } = validationContext;
      if (!value.length) {
        return createError({
          message: "tender categories is required",
        });
      }
      return true;
    }),
  allow_resubmission: Yup.boolean().required("allow resubmission is required"),
  allow_withdrawal: Yup.boolean().required("allow withdrawal is required"),
  allow_offline_submission: Yup.boolean().required(
    "allow offline submission is required"
  ),
  payment_mode: Yup.string().required("payment mode is required"),
  bank_id: Yup.number().when("payment_mode", {
    is: "online",
    then: (schema) => schema.required("bank is required"),
    otherwise: (schema) => schema.nullable().optional(),
  }),
  instrument: Yup.string().when("payment_mode", {
    is: "offline",
    then: (schema) => schema.required("instrument is required"),
    otherwise: (schema) => schema.nullable().optional(),
  }),
  file: Yup.object({
    file_name: Yup.string().required("file name is required"),
    size: Yup.string().nullable().optional(),
    path: Yup.string().nullable().optional(),
  }),
});
