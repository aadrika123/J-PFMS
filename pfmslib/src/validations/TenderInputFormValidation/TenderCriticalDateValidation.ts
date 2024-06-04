import * as Yup from "yup";

export const tenderCriticalDateSchema = Yup.object({
  publishing_date: Yup.string()
    .required("publishing date is required")
    .test("publishing_date", (value, validationContex) => {
      const { createError } = validationContex;
      if (new Date(value) < new Date()) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  bid_opeining_date: Yup.string()
    .required("bid opening date is required")
    .test("bid_opeining_date", (value, validationContex) => {
      const {
        createError,
        parent: {
          publishing_date,
          bid_submission_end_date,
          document_sale_end_date,
          seek_clarification_end_date,
        },
      } = validationContex;
      const bsed = new Date(bid_submission_end_date);
      bsed.setDate(bsed.getDate() + 15);
      if (new Date(value) < new Date(publishing_date)) {
        return createError({
          message: "Invalid Date",
        });
      } else if (new Date(value) < bsed) {
        return createError({
          message: "Invalid Date",
        });
      } else if (
        new Date(value) < new Date(document_sale_end_date) ||
        new Date(value) < new Date(seek_clarification_end_date)
      ) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  document_sale_start_date: Yup.string()
    .required("document sale start is required")
    .test("document_sale_start_date", (value, validationContex) => {
      const {
        createError,
        parent: { publishing_date },
      } = validationContex;
      if (new Date(value) < new Date(publishing_date)) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  document_sale_end_date: Yup.string()
    .required("document sale end is required")
    .test("bid_opeining_date", (value, validationContex) => {
      const {
        createError,
        parent: { document_sale_start_date },
      } = validationContex;
      if (new Date(value) < new Date(document_sale_start_date)) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  seek_clarification_start_date: Yup.string()
    .required("seek clarification start is required")
    .test("seek_clarification_start_date", (value, validationContex) => {
      const {
        createError,
        parent: { publishing_date },
      } = validationContex;
      if (new Date(value) < new Date(publishing_date)) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  seek_clarification_end_date: Yup.string()
    .required("seek clarification end is required")
    .test("seek_clarification_end_date", (value, validationContex) => {
      const {
        createError,
        parent: { seek_clarification_start_date },
      } = validationContex;
      if (new Date(value) < new Date(seek_clarification_start_date)) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  bid_submission_start_date: Yup.string()
    .required("bid submission start is required")
    .test("bid_submission_start_date", (value, validationContex) => {
      const {
        createError,
        parent: { publishing_date },
      } = validationContex;
      if (new Date(value) < new Date(publishing_date)) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  bid_submission_end_date: Yup.string()
    .required("bid submission end is required")
    .test("bid_submission_end_date", (value, validationContex) => {
      const {
        createError,
        parent: { bid_submission_start_date, publishing_date },
      } = validationContex;
      const pd = new Date(publishing_date);
      pd.setDate(pd.getDate() + 15);
      if (new Date(value) < new Date(bid_submission_start_date)) {
        return createError({
          message: "Invalid Date",
        });
      } else if (new Date(value) < pd) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
  pre_bid_meeting_date: Yup.string()
    .required("pre bid meeting is required")
    .test("pre_bid_meeting_date", (value, validationContex) => {
      const {
        createError,
        parent: { publishing_date, bid_opeining_date },
      } = validationContex;
      if (new Date(value) < new Date(publishing_date)) {
        return createError({
          message: "Invalid Date",
        });
      } else if (new Date(value) > new Date(bid_opeining_date)) {
        return createError({
          message: "Invalid Date",
        });
      }
      return true;
    }),
});
