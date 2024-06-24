/**
 * | Author- Sanjiv Kumar
 * | Created On- 23-06-2024
 * | Status- open
 * | Created For- Awarded Tender BOQs
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class AwardedBoqsDao {
  /* Create ro Update Tender Fee Details */
  async create() {
    // const dbData = {
    //   awarded_tender_id: data.awarded_tender_id,
    //   tender_fee_examption_allowed: data.tender_fee_examption_allowed,
    //   tender_fee: !data.tender_fee_examption_allowed ? data.tender_fee : null,
    //   processing_fee: !data.tender_fee_examption_allowed
    //     ? data.processing_fee
    //     : null,
    //   tender_fee_payable_to: !data.tender_fee_examption_allowed
    //     ? data.tender_fee_payable_to
    //     : null,
    //   tender_fee_payable_at: !data.tender_fee_examption_allowed
    //     ? data.tender_fee_payable_at
    //     : null,
    //   surcharges: !data.tender_fee_examption_allowed ? data.surcharges : null,
    //   other_charges: !data.tender_fee_examption_allowed
    //     ? data.other_charges
    //     : null,
    //   emd_examption_allowed: data.emd_examption_allowed,
    //   emd_fee_type: !data.emd_examption_allowed ? data.emd_fee_type : null,
    //   fixed_emd_fee: !data.emd_examption_allowed
    //     ? data.emd_fee_type === "fixed"
    //       ? data.fixed_emd_fee
    //       : null
    //     : null,
    //   percentage_emd_fee: !data.emd_examption_allowed
    //     ? data.emd_fee_type === "percentage"
    //       ? data.percentage_emd_fee
    //       : null
    //     : null,
    //   emd_fee_payable_to: !data.emd_examption_allowed
    //     ? data.emd_fee_payable_to
    //     : null,
    //   emd_fee_payable_at: !data.emd_examption_allowed
    //     ? data.emd_fee_payable_at
    //     : null,
    // };

    // const res = await prisma.tender_fee_details.upsert({
    //   where: {
    //     awarded_tender_id: data.awarded_tender_id,
    //   },
    //   update: dbData,
    //   create: dbData,
    // });

    const res = "";

    return generateRes(res);
  }

  /* Get Awarded Boqs By Awarded Tender Id */
  async getByAwardedTenderId(id: number) {
    /* Getting awarded boqs */
    const res: any = await prisma.awarded_boqs.findMany({
      where: {
        awarded_tender_id: id,
      },
      select: {
        awarded_tender_id: true,
        item_no: true,
        description: true,
        unit: true,
        length: true,
        breadth: true,
        height: true,
        quantity: true,
        remarks: true,
        amount: true,
        sor_rate: true,
      },
    });

    return generateRes(res);
  }
}

export default AwardedBoqsDao;
