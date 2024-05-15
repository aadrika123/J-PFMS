import * as Yup from "yup";
import { executionBody } from "../lists/jsonList";

//////// Check Execution Body is ULB or Not
const isUlb = (id: number) => {
  return executionBody.find((i) => i.id === id)?.name === "ULB";
};

const fileTypeSchema = Yup.object({
  // document_type_id: Yup.number().required("doc type id is required"),
  file_token: Yup.string().required("please upload the document"),
  file_name: Yup.string().optional(),
});

// Validating request data
export const projectProposalValidationSchema = Yup.object({
  district_id: Yup.number()
    .required("district is required")
    .integer()
    .min(1, "plsease select district"),
  description: Yup.string().matches(
    /^[A-Za-z0-9_(),.\s']*$/,
    "special character not allowed"
  ),
  summary: Yup.string()
    .required("summary is required.")
    .matches(/^[A-Za-z0-9_(),.\s']*$/, "special character not allowed"),
  state_id: Yup.number()
    .required("state is required")
    .integer()
    .min(1, "plsease select state"),
  execution_body: Yup.string().required('please slelect execution body'),
  // execution_body: Yup.number()
  //   .integer()
  //   .required("execution body required")
  //   .min(1, "plsease select state"),
  // ulb_id: Yup.number()
  //   .integer()
  //   .when("execution_body", {
  //     is: 4,
  //     then: (schema) =>
  //       schema.min(1, "plsease select ulb").required("ulb is required"),
  //     otherwise: (schema) => schema.optional(),
  //   }),
  // ward_id: Yup.number()
  //   .integer()
  //   .when("execution_body", {
  //     is: 4,
  //     then: (schema) =>
  //       schema.min(1, "plsease select ward").required("ward is required"),
  //     otherwise: (schema) => schema.optional(),
  //   }),
  ulb_id: Yup.number()
    .integer()
    .optional(),
  ward_id: Yup.number()
    .integer()
    .optional(),
  user_id: Yup.number().required("user is required"),
  address: Yup.string().required("address is required"),
  pin_code: Yup.string()
    .required("Pin Code is required")
    .test("pin_code", (value, validationContext) => {
      const { createError } = validationContext;
      if (String(value).length !== 6) {
        return createError({
          message: "should be 6 digit",
        });
      }
      return true;
    }),
  files: Yup.array(fileTypeSchema),
});

export const multiProjectProposalValidationSchema = Yup.array(
  projectProposalValidationSchema
);

export default {
  projectProposalValidationSchema,
  multiProjectProposalValidationSchema,
};
