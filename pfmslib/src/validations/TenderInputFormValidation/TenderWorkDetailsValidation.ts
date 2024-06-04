import * as Yup from "yup";

export const tenderWorkDetailsSchema = Yup.object({
  work_title: Yup.string().required("work title is required"),
  description: Yup.string()
    .required("description is required")
    .matches(/^[A-Za-z0-9_(),.\s']*$/, "special character not allowed"),
  pre_qualification_details: Yup.string().optional(),
  product_categories: Yup.array()
    .required("product categories is required")
    .test("product_categories", (value, validationContext) => {
      const { createError } = validationContext;
      if (!value.length) {
        return createError({
          message: "product categories is required",
        });
      }
      return true;
    }),
  product_sub_category: Yup.string().required(
    "product sub category is required"
  ),
  contract_type: Yup.string().required("contract type is required"),
  tender_value: Yup.string().required("tender value is required"),
  bid_validity: Yup.string().required("bid validity is required"),
  completion_period: Yup.number()
    .required("completion period is required")
    .min(1, "less then 1 is not allowed")
    .test("completion_period", (value, validationContext) => {
      const { createError } = validationContext;
      if (value > 120) {
        return createError({
          message: "should not be greater then 120 months",
        });
      }
      return true;
    }),
  work_location: Yup.string().required("work location is required"),
  pin_code: Yup.number()
    .required("pin code is required")
    .min(1, "less then 1 is not allowed")
    .test("pin_code", (value, validationContext) => {
      const { createError } = validationContext;
      if (String(value).length !== 6) {
        return createError({
          message: "should be 6 digit",
        });
      }
      return true;
    }),
  pre_bid_meeting: Yup.boolean().required("pre bid meeting is required"),
  bid_opening_place: Yup.string().when("pre_bid_meeting", {
    is: true,
    then: (schema) => schema.required("bid opening place is required"),
    otherwise: (schema) => schema.optional(),
  }),
  pre_bid_meeting_place: Yup.string().when("pre_bid_meeting", {
    is: true,
    then: (schema) => schema.required("pre bid meeting place is required"),
    otherwise: (schema) => schema.optional(),
  }),
  pre_bid_meeting_address: Yup.string().when("pre_bid_meeting", {
    is: true,
    then: (schema) => schema.required("pre bid meeting address is required"),
    otherwise: (schema) => schema.optional(),
  }),
  tenderer_class: Yup.array()
    .required("tenderer class is required")
    .test("tenderer_class", (value, validationContext) => {
      const { createError } = validationContext;
      if (!value.length) {
        return createError({
          message: "tenderer class is required",
        });
      }
      return true;
    }),
  inviting_officer_name: Yup.string()
    .required("inviting officer name is required")
    .matches(/^[A-Za-z0-9\s']*$/, "special character not allowed"),
  inviting_officer_address: Yup.string().required(
    "inviting officer address is required"
  ),
  inviting_officer_contact: Yup.string().required(
    "inviting officer contact is required"
  ),
});
