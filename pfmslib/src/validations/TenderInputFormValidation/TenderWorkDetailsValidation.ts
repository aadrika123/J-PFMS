import * as Yup from "yup";

export type tenderWorkDetailsType = {
  tender_datasheet_id: number;
  work_title: string;
  description: string;
  pre_qualification_details: string;
  product_categories: string[];
  product_sub_category: string;
  contract_type: string;
  tender_value: string;
  bid_validity: string;
  completion_period: number;
  work_location: string;
  pin_code: number;
  pre_bid_meeting: boolean;
  bid_opening_place: string;
  pre_bid_meeting_place: string;
  pre_bid_meeting_address: string;
  tenderer_class: string[];
  inviting_officer_name: string;
  inviting_officer_address: string;
  inviting_officer_contact: string;
};

export const tenderWorkDetailsSchema = Yup.object({
  tender_datasheet_id: Yup.number().required("tender datasheet id is required"),
  work_title: Yup.string().required("work title is required"),
  description: Yup.string()
    .required("description is required")
    .matches(/^[A-Za-z0-9_(),.\s']*$/, "special character not allowed"),
  pre_qualification_details: Yup.string().nullable().optional(),
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
          message: "completion should not be greater then 120 months",
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
          message: "pin code should be 6 digit",
        });
      }
      return true;
    }),
  pre_bid_meeting: Yup.boolean().required("pre bid meeting is required"),
  bid_opening_place: Yup.string().when("pre_bid_meeting", {
    is: true,
    then: (schema) => schema.required("bid opening place is required"),
    otherwise: (schema) => schema.nullable().optional(),
  }),
  pre_bid_meeting_place: Yup.string().when("pre_bid_meeting", {
    is: true,
    then: (schema) => schema.required("pre bid meeting place is required"),
    otherwise: (schema) => schema.nullable().optional(),
  }),
  pre_bid_meeting_address: Yup.string().when("pre_bid_meeting", {
    is: true,
    then: (schema) => schema.required("pre bid meeting address is required"),
    otherwise: (schema) => schema.nullable().optional(),
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
