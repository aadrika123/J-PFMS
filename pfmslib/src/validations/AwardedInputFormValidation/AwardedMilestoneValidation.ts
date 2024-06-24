import * as Yup from "yup";

///////// AwardedMilestoneType ///////////
type milestones = {
  id?: number;
  amount: number;
  start_date: string;
  end_date: string;
  percentage: number;
};

export type awardedMilestoneType = {
  awarded_tender_id: number;
  milestones: milestones[];
};

const milestoneSchema = Yup.object({
  amount: Yup.number().required("amount is required"),
  start_date: Yup.string()
    .required("finacial date is required")
    .test("start_date", (value, validationContex) => {
      const { createError } = validationContex;
      if (!value) {
        return createError({
          message: "finacial date is required",
        });
      } else if (new Date(value) <= new Date()) {
        return createError({
          message: "finacial date should be greater than current date",
        });
      }
      return true;
    }),
  end_date: Yup.string()
    .required("date is required")
    .test("end_date", (value, validationContex) => {
      const {
        createError,
        parent: { start_date },
      } = validationContex;
      if (!value) {
        return createError({
          message: "date is required",
        });
      } else if (new Date(value) <= new Date(start_date)) {
        return createError({
          message: "date should be greater than finacial date",
        });
      }
      return true;
    }),
  percentage: Yup.number().required("percentage is required").max(100, "should be equal or less than 100"),
});

///////// Awarded Milestone Schema //////////
export const awardedMilestoneSchema = Yup.object({
  awarded_tender_id: Yup.number().required("awared tender id is required"),
  milestones: Yup.array(milestoneSchema)
    .required("milestone are required")
    .test("milestone", (value, validationContex) => {
      const { createError } = validationContex;
      if (value.length === 0) {
        return createError({
          message: "milestone are required",
        });
      } else {
        let sum = 0;
        value.forEach((i) => {
          sum = sum + i.percentage;
        });

        if (sum > 100) {
          return createError({
            message: "percentage can't be greater than 100",
          });
        }
        return true;
      }
    }),
});
