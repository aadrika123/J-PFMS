/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Project Details
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { awardedTenderValidation } from "pfmslib";

const prisma = new PrismaClient();

class AwardedProjectDetailsDao {
  /* Create ro Update Awarded Project Details */
  async create(data: awardedTenderValidation.projectDetailsType) {
    const dbData = {
      awarded_tender_id: data.awarded_tender_id,
      project_cost: data.project_cost,
    };

    const res = await prisma.awarded_project_details.upsert({
      where: {
        awarded_tender_id: data.awarded_tender_id,
      },
      update: dbData,
      create: dbData,
    });

    return generateRes(res);
  }

  /* Get Awarded Project Detail By Awarded Tender Id */
  async getByAwardedTenderId(id: number) {
    const res: any = await prisma.awarded_project_details.findFirst({
      where: {
        awarded_tender_id: id,
      },
      select: {
        id: true,
        awarded_tender_id: true,
        project_cost: true
      },
    });

    return generateRes(res);
  }
}

export default AwardedProjectDetailsDao;
