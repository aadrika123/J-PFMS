import * as Yup from "yup";

export type tenderDetailsType = {
  awarded_tender_id: number;
  contractor_name: string;
  agreement_type_id: number;
  agreement_no: string;
  agreement_date: string;
  work_order_no: string;
  awarding_authority: string;
  quoted_amount: number;
  quoted_percentage: number;
};

///////// Project Details Schema //////////
export const awardedTenderDetailsSchema = Yup.object({
  awarded_tender_id: Yup.number().required("awared tender id is required"),
  contractor_name: Yup.string().required("contractor name is required"),
  agreement_type_id: Yup.number().required("agreement type is required"),
  agreement_no: Yup.string().required("agreement number is required"),
  agreement_date: Yup.string().required("agreement date is required"),
  work_order_no: Yup.string().required("work order number is required"),
  awarding_authority: Yup.string().required("awarding authority is required"),
  quoted_amount: Yup.number().required("quoted amount is required"),
  quoted_percentage: Yup.number().required("quoted percentage is required"),
});
