/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Critical Dates
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { tenderCriticalDatesType } from "pfmslib";

const prisma = new PrismaClient();

class TenderCriticalDatesDao {
  /* Create ro Update Tender Critical Dates */
  async create(data: tenderCriticalDatesType) {
    const dbData = {
      tender_datasheet_id: data.tender_datasheet_id,
      publishing_date: data.publishing_date,
      bid_opening_date: data.bid_opening_date,
      document_sale_start_date: data.document_sale_start_date,
      document_sale_end_date: data.document_sale_end_date,
      seek_clarification_start_date: data.seek_clarification_start_date,
      seek_clarification_end_date: data.seek_clarification_end_date,
      bid_submission_start_date: data.bid_submission_start_date,
      bid_submission_end_date: data.bid_submission_end_date,
      pre_bid_meeting_date: data.pre_bid_meeting_date,
    };

    const res = await prisma.tender_critical_dates.upsert({
      where: {
        tender_datasheet_id: data.tender_datasheet_id,
      },
      update: dbData,
      create: dbData,
    });

    return generateRes(res);
  }

  /* Get Tender Fee Detail By Tender Datasheet Id */
  async getByTenderDatasheetId(id: number) {
    /* Getting Critical Dates */
    const res: any = await prisma.tender_critical_dates.findFirst({
      where: {
        tender_datasheet_id: id,
      },
      select: {
        tender_datasheet_id: true,
        publishing_date: true,
        bid_opening_date: true,
        document_sale_start_date: true,
        document_sale_end_date: true,
        seek_clarification_start_date: true,
        seek_clarification_end_date: true,
        bid_submission_start_date: true,
        bid_submission_end_date: true,
        pre_bid_meeting_date: true,
      },
    });

    return generateRes(res);
  }
}

export default TenderCriticalDatesDao;
