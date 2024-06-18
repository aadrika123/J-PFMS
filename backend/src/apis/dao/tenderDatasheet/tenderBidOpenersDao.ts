/**
 * | Author- Sanjiv Kumar
 * | Created On- 07-06-2024
 * | Status- open
 * | Created For- Tender Bid Openers
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { tenderBidOpenersType } from "pfmslib";

const prisma = new PrismaClient();

class TenderBidOpenersDao {
  /* Create ro Update Tender Bid Openers */
  async create(data: tenderBidOpenersType) {
    const res = await prisma.$transaction(async (tx) => {
      /* Deleting tender openers */
      await tx.tender_bid_openers.deleteMany({
        where: {
          tender_datasheet_id: data.tender_datasheet_id,
        },
      });

      for (const opener of data.bid_openers) {
        const dbData = {
          tender_datasheet_id: data.tender_datasheet_id,
          name: opener.name,
          email: opener.email,
        };

        await tx.tender_bid_openers.upsert({
          where: {
            tender_datasheet_id_email: {
              tender_datasheet_id: data.tender_datasheet_id,
              email: opener.email,
            },
          },
          update: dbData,
          create: dbData,
        });
      }

      if (data.files.length) {
        /* Deleting conver documents */
        await tx.tender_documents.deleteMany({
          where: {
            reference_id: Number(data.tender_datasheet_id),
            reference_type: "tender_bid_opener",
          },
        });

        for (const file of data.files) {
          const dbFile = {
            path: file.path,
            file_name: file.file_name,
            size: file.size,
            description: file.description,
            reference_id: Number(data.tender_datasheet_id),
            reference_type: "tender_bid_opener",
          };
          await tx.tender_documents.upsert({
            where: {
              reference_id_path: {
                reference_id: Number(data.tender_datasheet_id),
                path: file.path,
              },
            },
            update: dbFile,
            create: dbFile,
          });
        }
      }

      return "res";
    });

    return generateRes(res);
  }

  /* Get Tender Cover Detail By Tender Datasheet Id */
  async getByTenderDatasheetId(id: number) {
    const res = await prisma.$transaction(async (tx) => {
      /* Getting conver details */
      const res: any = await tx.tender_bid_openers.findMany({
        where: {
          tender_datasheet_id: id,
        },
        select: {
          tender_datasheet_id: true,
          name: true,
          email: true,
        },
      });

      /* Getting conver documents */
      const docs: any = await tx.tender_documents.findMany({
        where: {
          reference_id: id,
          reference_type: "tender_bid_opener",
        },
        select: {
          file_name: true,
          size: true,
          path: true,
          description: true,
        },
      });

      return { bid_openers: res, files: docs };
    });

    return generateRes(res);
  }
}

export default TenderBidOpenersDao;
