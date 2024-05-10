import * as Yup from "yup";

const fileTypeSchema = Yup.object({
  document_type_id: Yup.number().required("doc type id is required"),
  file_token: Yup.string().required("please upload the document"),
  file_name: Yup.string().optional()
});

// Validating request data
export const projectProposalValidationSchema = Yup.object({
  district_id: Yup.number()
    .required("district is required")
    .integer()
    .min(1, "plsease select district"),
  description: Yup.string().matches(/^[A-Za-z0-9_(),\s']*$/, "special character not allowed"),
  summary: Yup.string().required("summary is required.").matches(/^[A-Za-z0-9_(),\s']*$/, "special character not allowed"),
  state_id: Yup.number()
    .required("state is required")
    .integer()
    .min(1, "plsease select state"),
  ulb_id: Yup.number()
    .required("ULB is required")
    .integer()
    .min(1, "plsease select ulb"),
  ward_id: Yup.number()
    .required("ward is required")
    .integer()
    .min(1, "plsease select ward"),
  user_id: Yup.number().required("user is required"),
  address: Yup.string().required("Address is required").matches(/^[A-Za-z0-9_(),:-\s']*$/, "special character not allowed"),
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
