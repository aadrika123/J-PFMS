import * as Yup from "yup";

export const tenderBidDetailsSchema = Yup.object({
  bid_openers: Yup.array()
    .transform((field) => field.slice(0, -1))
    .of(
      Yup.object().shape({
        email: Yup.string()
          .email("Email is Invalid")
          .required("email is required"),
        name: Yup.string().required("name is required")
      })
    ),
  files: Yup.array(
    Yup.object({
      file_name: Yup.string().required("file name is required"),
      file_description: Yup.string().required("file description is required"),
      file_size: Yup.string().required("file size is required"),
      file: Yup.string().required("file is required"),
    })
  ),
});
