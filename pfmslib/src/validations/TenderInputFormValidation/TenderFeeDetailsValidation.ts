import * as Yup from "yup";

export const tenderFeeDetailsSchema = Yup.object({
  tender_fee_examption_allowed: Yup.boolean().required(
    "tender fee examption allowed is required"
  ),
  tender_fee: Yup.number().when("tender_fee_examption_allowed", {
    is: false,
    then: (schema) => schema.required("tender fee is required").min(1, 'less then 1 is not allowed'),
    otherwise: (schema) => schema.optional(),
  }),
  processing_fee: Yup.number().min(0, 'less then 0 is not allowed').optional(),
  tender_fee_payable_to: Yup.string().when("tender_fee_examption_allowed", {
    is: false,
    then: (schema) => schema.required("tender fee payable to is required"),
    otherwise: (schema) => schema.optional(),
  }),
  tender_fee_payable_at: Yup.string().when("tender_fee_examption_allowed", {
    is: false,
    then: (schema) => schema.required("tender fee payable at is required"),
    otherwise: (schema) => schema.optional(),
  }),
  surcharges: Yup.number().min(0, 'less then 0 is not allowed').optional(),
  other_charges: Yup.number().optional().min(0, 'less then 0 is not allowed'),
  emd_examption_allowed: Yup.boolean().required(
    "emd examption allowed is required"
  ),
  emd_fee_type: Yup.string().when("emd_examption_allowed", {
    is: false,
    then: (schema) => schema.required("emd fee type is required"),
    otherwise: (schema) => schema.optional(),
  }),
  fixed_emd_fee: Yup.number().when("emd_examption_allowed", {
    is: false,
    then: (schema) => schema.required("fixed emd fee is required").min(1, 'less then 1 is not allowed'),
    otherwise: (schema) => schema.optional(),
  }),
  percentage_emd_fee: Yup.number().when("emd_examption_allowed", {
    is: false,
    then: (schema) => schema.required("percentage emd fee is required").max(100, 'greater then 100 is not allowed').min(1, 'less then 1 is not allowed'),
    otherwise: (schema) => schema.optional(),
  }),
  emd_fee_payable_to: Yup.string().when("emd_examption_allowed", {
    is: false,
    then: (schema) => schema.required("emd fee payable to is required"),
    otherwise: (schema) => schema.optional(),
  }),
  emd_fee_payable_at: Yup.string().when("emd_examption_allowed", {
    is: false,
    then: (schema) => schema.required("emd fee payable at is required"),
    otherwise: (schema) => schema.optional(),
  }),
});
