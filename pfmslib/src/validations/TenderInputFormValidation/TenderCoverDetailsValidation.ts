import * as Yup from "yup";

///////// TenderCoverDetailsType ///////////
type files = {
  file_id: number;
  type: string;
  file_name: string;
  size: string;
  path: string;
};

export type tenderCoverDetailsType = {
  tender_datasheet_id: number;
  content: string;
  cover_no: string;
  files: files[];
};

export const coverList = {
  title: "No of Covers",
  options: [
    {
      label: "Single Cover",
      value: "1",
      list: ["Fee/Prequal/Technical/Financial"],
    },
    {
      label: "Two Cover",
      value: "2",
      list: ["Fee/Prequal/Technical", "Financial"],
    },
    {
      label: "Three Cover",
      value: "3",
      list: ["Fee", "Prequal/Technical", "Financial"],
    },
    {
      label: "Four Cover",
      value: "4",
      list: ["Fee", "Prequal", "Technical", "Financial"],
    },
  ],
};

const fileSchema = Yup.object({
  file_id: Yup.number().nullable().optional(),
  type: Yup.string().required("type is required"),
  file_name: Yup.string().required("file name is required"),
  size: Yup.string().required("size is required"),
  path: Yup.string().nullable().optional(),
});

///////// Tender Basic Details Schema //////////
export const tenderCoverDetailsSchema = Yup.object({
  tender_datasheet_id: Yup.number().required("tender datasheet id is required"),
  cover_no: Yup.string().required("cover no is required"),
  content: Yup.string().required("content is required"),
  files: Yup.array(fileSchema)
    .required("files are required")
    .test("files", (value, validationContex) => {
      const {
        createError,
        parent: { cover_no },
      } = validationContex;
      if (value.length === 0) {
        return createError({
          message: "files are required",
        });
      }

      /*  Getting the Tab/File Type List from CoverList */
      const fileList = coverList.options.find((i) => i.value === cover_no).list;

      /*  Making a object of comming file types from request */
      const commingFile = new Set(value.map((i) => i.type));

      /*  Getting the Remaing files */
      const remainingFiles = fileList.filter(
        (i) => !commingFile.has(i.toLowerCase())
      );

      if (remainingFiles.length > 0) {
        return createError({
          message: `${remainingFiles} are missing. please upload.`,
        });
      }
      return true;
    }),
});
