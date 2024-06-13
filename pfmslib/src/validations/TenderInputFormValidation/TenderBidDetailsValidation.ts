import * as Yup from "yup";

type openerType = {
  name: string;
  email: string;
};

type fileType = {
  file_name: string;
  description: string;
  size: string;
  path: string;
};

export type tenderBidOpenersType = {
  tender_datasheet_id: number;
  bid_openers: openerType[];
  files: fileType[];
};

export const tenderBidDetailsSchema = Yup.object({
  tender_datasheet_id: Yup.number().required("tender datasheet id is required"),
  bid_openers: Yup.array()
    .transform((field) => field.slice(0, -1))
    .of(
      Yup.object().shape({
        email: Yup.string()
          .email("Email is Invalid")
          .required("email is required"),
        name: Yup.string().required("name is required"),
      })
    ),
  files: Yup.array(
    Yup.object({
      file_name: Yup.string().required("file name is required"),
      description: Yup.string().required("file description is required"),
      size: Yup.string().required("file size is required"),
      path: Yup.string().required("file is required"),
    })
  ),
});
