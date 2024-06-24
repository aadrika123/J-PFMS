/**
 * | Author- Sanjiv Kumar
 * | Created On- 23-06-2024
 * | Status- open
 * | Created For- Awarded Project Duration
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { awardedTenderValidation } from "pfmslib";

const prisma = new PrismaClient();

class AwardedProjectDurationDao {
  /* Create ro Update Awarded Project Duration */
  async create(data: awardedTenderValidation.projectDurationsType) {
    const dbData = {
      awarded_tender_id: data.awarded_tender_id,
      start_date: data.commencement_date,
      end_date: data.stipulated_completion_date,
      wp_in_month: data.work_period_day ? null : data.work_period_month,
      wp_in_day: data.work_period_month ? null : data.work_period_day,
    };

    const res = await prisma.awarded_project_durations.upsert({
      where: {
        awarded_tender_id: data.awarded_tender_id,
      },
      update: dbData,
      create: dbData,
    });

    return generateRes(res);
  }

  /* Get Awarded Project Duration By Awarded Tender Id */
  async getByAwardedTenderId(id: number) {
    const res: any[] = await prisma.$queryRaw`
    select 
    id,
    awarded_tender_id,
    start_date as commencement_date,
    end_date as stipulated_completion_date,
    wp_in_month as work_period_month,
    wp_in_day as work_period_day
    from 
    awarded_project_durations
    where awarded_tender_id = ${id}
    `;

    return generateRes(res[0]);
  }
}

export default AwardedProjectDurationDao;
