/**
 * | Author- Sanjiv Kumar
 * | Created On- 04-06-2024
 * | Status- open
 * | Created For- Tender Basic Details
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { tenderBasicDetailsType } from "pfmslib";

const prisma = new PrismaClient();

class TenderBasicDetailsDao {
  /* Create ro Update Tender Basic Details */
  async create(data: tenderBasicDetailsType) {
    const dbData = {
      tender_datasheet_id: data.tender_datasheet_id,
      reference_no: data.reference_no,
      tender_type: data.tender_type,
      contract_forms: data.contract_forms,
      tender_categories: data.tender_categories,
      allow_resubmission: data.allow_resubmission,
      allow_withdrawal: data.allow_withdrawal,
      allow_offline_submission: data.allow_offline_submission,
      payment_mode: data.payment_mode,
      bank_id: data.payment_mode === "offline" ? null : data.bank_id,
      instrument: data.payment_mode === "offline" ? data.instrument : null,
    };

    const res = await prisma.$transaction(async (tx) => {
      // await tx.tender_datasheets.update({
      //   where: {
      //     id: data.tender_datasheet_id,
      //   },
      //   data: {
      //     status: "draft",
      //   },
      // });
      const res = await tx.tender_basic_details.upsert({
        where: {
          tender_datasheet_id: data.tender_datasheet_id,
        },
        update: dbData,
        create: dbData,
      });

      const dbFile = {
        ...data.file,
        reference_id: Number(res.id),
        reference_type: "tender_basic_detail",
      };

      /* Deleting conver documents */
      await tx.tender_documents.deleteMany({
        where: {
          reference_id: Number(data.tender_datasheet_id),
          reference_type: "tender_basic_detail",
        },
      });

      await tx.tender_documents.upsert({
        where: {
          reference_id_path: {
            reference_id: Number(res.id),
            path: data.file.path,
          },
        },
        update: dbFile,
        create: dbFile,
      });
      return res;
    });

    return generateRes(res);
  }

  /* Get Tender Basic Detail By Tender Datasheet Id */
  async getByTenderDatasheetId(id: number) {
    const res = await prisma.$transaction(async (tx) => {
      const res: any = await tx.tender_basic_details.findFirst({
        where: {
          tender_datasheet_id: id,
        },
        select: {
          tender_datasheet_id: true,
          reference_no: true,
          tender_type: true,
          contract_forms: true,
          tender_categories: true,
          allow_resubmission: true,
          allow_withdrawal: true,
          allow_offline_submission: true,
          payment_mode: true,
          instrument: true,
          bank: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const doc = await tx.tender_documents.findFirst({
        where: {
          reference_id: res.id,
          reference_type: "tender_basic_detail",
        },
        select: {
          file_name: true,
          size: true,
          path: true,
        },
      });

      return { ...res, file: doc };
    });

    return generateRes(res);
  }
}

export default TenderBasicDetailsDao;
