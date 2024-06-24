/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tender Details
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { awardedTenderValidation } from "pfmslib";

const prisma = new PrismaClient();

class AwardedTenderDetailsDao {
  /* Create ro Update Awarded Tender Details */
  async create(data: awardedTenderValidation.tenderDetailsType) {
    const dbData = {
      awarded_tender_id: data.awarded_tender_id,
      contractor_name: data.contractor_name,
      agreement_type_id: data.agreement_type_id,
      agreement_no: data.agreement_no,
      agreement_date: data.agreement_date,
      work_order_no: data.work_order_no,
      awarding_authority: data.awarding_authority,
      quoted_amount: data.quoted_amount,
      quoted_percentage: data.quoted_percentage
    };

    const res = await prisma.awarded_tender_details.upsert({
      where: {
        awarded_tender_id: data.awarded_tender_id,
      },
      update: dbData,
      create: dbData,
    });

    return generateRes(res);
  }

  /* Get Awarded Tender Detail By Awarded Tender Id */
  async getByAwardedTenderId(id: number) {
    /* Getting Awarded Tender Details */
    const res: any = await prisma.awarded_tender_details.findFirst({
      where: {
        awarded_tender_id: id,
      },
      select: {
        awarded_tender_id: true,
        contractor_name: true,
        agreement_type: {
          select:{
            id: true,
            name: true
          }
        },
        agreement_no: true,
        agreement_date: true,
        work_order_no: true,
        awarding_authority: true,
        quoted_amount: true,
        quoted_percentage: true
      },
    });

    return generateRes(res);
  }
}

export default AwardedTenderDetailsDao;
