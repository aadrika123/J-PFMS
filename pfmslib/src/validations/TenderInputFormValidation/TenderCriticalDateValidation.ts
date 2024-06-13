import * as Yup from "yup";

export type tenderCriticalDatesType = {
  tender_datasheet_id: number;
  publishing_date: string;
  bid_opening_date: string;
  document_sale_start_date: string;
  document_sale_end_date: string;
  seek_clarification_start_date: string;
  seek_clarification_end_date: string;
  bid_submission_start_date: string;
  bid_submission_end_date: string;
  pre_bid_meeting_date: string;
};

export const tenderCriticalDateSchema = Yup.object({
  tender_datasheet_id: Yup.number().required("tender datasheet id is required"),
  publishing_date: Yup.string()
    .required("publishing date is required")
    .test("publishing_date", (value, validationContex) => {
      const { createError } = validationContex;
      if (new Date(value) < new Date()) {
        return createError({
          message: "publishing date should be greater then current date",
        });
      }
      return true;
    }),
  bid_opening_date: Yup.string()
    .required("bid opening date is required")
    .test("bid_opening_date", (value, validationContex) => {
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
      const bid_o_date = new Date(value);
      if (bid_o_date < new Date(publishing_date)) {
        return createError({
          message: "bid opening date should be greater then publishing date",
        });
      } else if (bid_o_date < bsed) {
        return createError({
          message: "bid opening date should be 15 days greater then bid submission end date",
        });
      } else if (bid_o_date < new Date(document_sale_end_date)) {
        return createError({
          message: "bid opening date should be greater then document sale end date",
        });
      } else if (bid_o_date < new Date(seek_clarification_end_date)) {
        return createError({
          message: "bid opening date should be greater then seek clarification end date",
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
          message: "document sale start date should be greater then publishing date",
        });
      }
      return true;
    }),
  document_sale_end_date: Yup.string()
    .required("document sale end is required")
    .test("bid_opening_date", (value, validationContex) => {
      const {
        createError,
        parent: { document_sale_start_date },
      } = validationContex;
      if (new Date(value) < new Date(document_sale_start_date)) {
        return createError({
          message: "document sale end date should be greater then document sale start date",
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
          message: "seek clarification start date should be greater then seek clarification start date",
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
          message: "seek clarification end date should be greater then seek clarification start date",
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
          message: "bid submission start date should be greater then publishing date",
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
          message: "bid submission end date should be greater then bid submission start date",
        });
      } else if (new Date(value) < pd) {
        return createError({
          message: "bid submission end date should be 15 days greater then publishing date",
        });
      }
      return true;
    }),
  pre_bid_meeting_date: Yup.string()
    .required("pre bid meeting is required")
    .test("pre_bid_meeting_date", (value, validationContex) => {
      const {
        createError,
        parent: { publishing_date, bid_opening_date },
      } = validationContex;
      if (new Date(value) < new Date(publishing_date)) {
        return createError({
          message: "pre bid meeting date should be greater then publishing date",
        });
      } else if (new Date(value) > new Date(bid_opening_date)) {
        return createError({
          message: "pre bid meeting date should be greater then bid opeining date",
        });
      }
      return true;
    }),
});
