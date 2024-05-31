import * as Yup from "yup";

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
  type: Yup.string().required("type is required"),
  tab_files: Yup.array(
    Yup.object({
      file_name: Yup.string().required("file name is required"),
      size: Yup.string().required("size is required"),
      path: Yup.string().optional(),
    })
  ).required("files are required"),
});

///////// Tender Basic Details Schema //////////
export const tenderCoverDetailsSchema = Yup.object({
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
      const commingFile = new Set(
        value.map((i) =>  i.type)
      );

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
