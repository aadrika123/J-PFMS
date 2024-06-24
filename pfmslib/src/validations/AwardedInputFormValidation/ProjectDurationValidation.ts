import * as Yup from "yup";

export type projectDurationsType = {
  awarded_tender_id: number;
  commencement_date: string;
  stipulated_completion_date: string;
  work_period_month: number;
  work_period_day: number;
};

///////// Project Details Schema //////////
export const projectDurationsSchema = Yup.object({
  awarded_tender_id: Yup.number().required("awared tender id is required"),
  commencement_date: Yup.string().required("commencement date is required").test("commencement_date", (value, validationContex) => {
    const { createError } = validationContex;
    if (!value) {
      return createError({
        message: "commencement date is required",
      });
    } else if (new Date(value) <= new Date()) {
      return createError({
        message: "commencement date should be greater then current date",
      });
    }
    return true;
  }),
  stipulated_completion_date: Yup.string().required(
    "stipulated completion date is required"
  ).test("stipulated_completion_date", (value, validationContex) => {
    const {
      createError,
      parent: { start_date },
    } = validationContex;
    if (!value) {
      return createError({
        message: "stipulated completion date is required",
      });
    } else if (new Date(value) <= new Date(start_date)) {
      return createError({
        message: "date should be greater then commencement date",
      });
    }
    return true;
  }),
  work_period_month: Yup.number().test(
    "work_period_month",
    (value, validationContex) => {
      const {
        createError,
        parent: { work_period_day },
      } = validationContex;
      if (value && work_period_day) {
        createError({
          message: "work period month not allowed",
        });
      } else if (!work_period_day && !value) {
        createError({
          message: "work period month is required",
        });
      }
      return true;
    }
  ),
  work_period_day: Yup.number().test(
    "work_period_day",
    (value, validationContex) => {
      const {
        createError,
        parent: { work_period_month },
      } = validationContex;
      if (value && work_period_month) {
        createError({
          message: "work period day not allowed",
        });
      } else if (!work_period_month && !value) {
        createError({
          message: "work period day is required",
        });
      }
      return true;
    }
  ),
});
