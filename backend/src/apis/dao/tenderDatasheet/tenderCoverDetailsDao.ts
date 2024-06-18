/**
 * | Author- Sanjiv Kumar
 * | Created On- 04-06-2024
 * | Status- open
 * | Created For- Tender Cover Details
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { tenderCoverDetailsType } from "pfmslib";

const prisma = new PrismaClient();

class TenderCoverDetailsDao {
  /* Create ro Update Tender Cover Details */
  async create(data: tenderCoverDetailsType) {
    const dbData = {
      tender_datasheet_id: data.tender_datasheet_id,
      cover_no: data.cover_no,
      content: data.content,
    };

    const res = await prisma.$transaction(async (tx) => {
      const res = await tx.tender_cover_details.upsert({
        where: {
          tender_datasheet_id: data.tender_datasheet_id,
        },
        update: dbData,
        create: dbData,
      });

      if (data.files.length) {
        /* Deleting conver documents */
        await tx.tender_documents.deleteMany({
          where: {
            reference_id: Number(res.id),
            reference_type: "tender_cover_detail",
          },
        });

        for (const file of data.files) {
          const dbFile = {
            path: file.path,
            file_name: file.file_name,
            size: file.size,
            type: file.type,
            reference_id: Number(res.id),
            reference_type: "tender_cover_detail",
          };
          await tx.tender_documents.upsert({
            where: {
              reference_id_path: {
                reference_id: Number(res.id),
                path: file.path,
              },
            },
            update: dbFile,
            create: dbFile,
          });
        }
      }

      return res;
    });

    return generateRes(res);
  }

  /* Get Tender Cover Detail By Tender Datasheet Id */
  async getByTenderDatasheetId(id: number) {
    const res = await prisma.$transaction(async (tx) => {
      /* Getting conver details */
      const res: any = await tx.tender_cover_details.findFirst({
        where: {
          tender_datasheet_id: id,
        },
        select: {
          id: true,
          tender_datasheet_id: true,
          cover_no: true,
          content: true,
        },
      });

      /* Getting conver documents */
      const docs: any = await tx.tender_documents.findMany({
        where: {
          reference_id: res.id,
          reference_type: "tender_cover_detail",
        },
        select: {
          type: true,
          file_name: true,
          size: true,
          path: true,
        },
      });

      return { ...res, files: docs };
    });

    return generateRes(res);
  }
}

export default TenderCoverDetailsDao;
