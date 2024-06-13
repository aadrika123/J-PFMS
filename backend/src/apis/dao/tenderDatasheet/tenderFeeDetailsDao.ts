/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Fee Details
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { tenderFeeDetailsType } from "pfmslib";

const prisma = new PrismaClient();

class TenderFeeDetailsDao {
  /* Create ro Update Tender Fee Details */
  async create(data: tenderFeeDetailsType) {
    const dbData = {
      tender_datasheet_id: data.tender_datasheet_id,
      tender_fee_examption_allowed: data.tender_fee_examption_allowed,
      tender_fee: !data.tender_fee_examption_allowed ? data.tender_fee : null,
      processing_fee: !data.tender_fee_examption_allowed
        ? data.processing_fee
        : null,
      tender_fee_payable_to: !data.tender_fee_examption_allowed
        ? data.tender_fee_payable_to
        : null,
      tender_fee_payable_at: !data.tender_fee_examption_allowed
        ? data.tender_fee_payable_at
        : null,
      surcharges: !data.tender_fee_examption_allowed ? data.surcharges : null,
      other_charges: !data.tender_fee_examption_allowed
        ? data.other_charges
        : null,
      emd_examption_allowed: data.emd_examption_allowed,
      emd_fee_type: !data.emd_examption_allowed ? data.emd_fee_type : null,
      fixed_emd_fee: !data.emd_examption_allowed
        ? data.emd_fee_type === "fixed"
          ? data.fixed_emd_fee
          : null
        : null,
      percentage_emd_fee: !data.emd_examption_allowed
        ? data.emd_fee_type === "percentage"
          ? data.percentage_emd_fee
          : null
        : null,
      emd_fee_payable_to: !data.emd_examption_allowed
        ? data.emd_fee_payable_to
        : null,
      emd_fee_payable_at: !data.emd_examption_allowed
        ? data.emd_fee_payable_at
        : null,
    };

    const res = await prisma.$transaction(async (tx) => {
      /* Changing tender datasheet status */
      // await tx.tender_datasheets.update({
      //   where: {
      //     id: data.tender_datasheet_id,
      //   },
      //   data: {
      //     status: "draft",
      //   },
      // });

      return await tx.tender_fee_details.upsert({
        where: {
          tender_datasheet_id: data.tender_datasheet_id,
        },
        update: dbData,
        create: dbData,
      });
    });

    return generateRes(res);
  }

  /* Get Tender Fee Detail By Tender Datasheet Id */
  async getByTenderDatasheetId(id: number) {
    /* Getting Fee details */
    const res: any = await prisma.tender_fee_details.findFirst({
      where: {
        tender_datasheet_id: id,
      },
      select: {
        tender_datasheet_id: true,
        tender_fee_examption_allowed: true,
        tender_fee: true,
        processing_fee: true,
        tender_fee_payable_to: true,
        tender_fee_payable_at: true,
        surcharges: true,
        other_charges: true,
        emd_examption_allowed: true,
        emd_fee_type: true,
        fixed_emd_fee: true,
        percentage_emd_fee: true,
        emd_fee_payable_to: true,
        emd_fee_payable_at: true,
      },
    });

    return generateRes(res);
  }
}

export default TenderFeeDetailsDao;
