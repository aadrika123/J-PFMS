import * as Yup from "yup";

///////// Tender Basic Details Schema //////////
export const tenderBasicDetailsSchema = Yup.object({
  reference_no: Yup.string().required("reference is required"),
  tender_type: Yup.string()
    .required("tender type is required"),
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
  bank: Yup.string()
    .when("payment_mode", {
      is: "online",
      then: (schema) =>
        schema.required('bank is required'),
      otherwise: (schema) => schema.optional(),
    }),
  instrument: Yup.string()
    .when("payment_mode", {
      is: "offline",
      then: (schema) =>
        schema.required('instrument is required'),
      otherwise: (schema) => schema.optional(),
    }),
  file: Yup.object({
    file_name: Yup.string().required("file name is required"),
    size: Yup.string().optional(),
    file_token: Yup.string().required("upload the document"),
  }),
});
