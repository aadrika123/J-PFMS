import * as Yup from "yup";

export type projectDetailsType = {
  awarded_tender_id: number;
  work_title: string;
  description: string;
  project_no: string;
  project_cost: number;
};

///////// Project Details Schema //////////
export const projectDetailsSchema = Yup.object({
  awarded_tender_id: Yup.number().required("awared tender id is required"),
  work_title: Yup.string().required("work title is required"),
  description: Yup.string().required("description is required"),
  project_no: Yup.string().required("project number is required"),
  project_cost: Yup.string().required("project cost is required"),
});
