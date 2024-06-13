/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-06-2024
 * | Status- open
 * | Created For- Tender Work Details
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { tenderWorkDetailsType } from "pfmslib";

const prisma = new PrismaClient();

class TenderWorkDetailsDao {
  /* Create ro Update Tender Work Details */
  async create(data: tenderWorkDetailsType) {
    const dbData = {
      tender_datasheet_id: data.tender_datasheet_id,
      work_title: data.work_title,
      description: data.description,
      pre_qualification_details: data.pre_qualification_details,
      product_categories: data.product_categories,
      product_sub_category: data.product_sub_category,
      contract_type: data.contract_type,
      tender_value: data.tender_value,
      bid_validity: data.bid_validity,
      completion_period: data.completion_period,
      work_location: data.work_location,
      pin_code: data.pin_code,
      pre_bid_meeting: data.pre_bid_meeting,
      bid_opening_place: data.pre_bid_meeting ? data.bid_opening_place : null,
      pre_bid_meeting_place: data.pre_bid_meeting
        ? data.pre_bid_meeting_place
        : null,
      pre_bid_meeting_address: data.pre_bid_meeting
        ? data.pre_bid_meeting_address
        : null,
      tenderer_class: data.tenderer_class,
      inviting_officer_name: data.inviting_officer_name,
      inviting_officer_address: data.inviting_officer_address,
      inviting_officer_contact: data.inviting_officer_contact,
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

      return await tx.tender_work_details.upsert({
        where: {
          tender_datasheet_id: data.tender_datasheet_id,
        },
        update: dbData,
        create: dbData,
      });
    });

    return generateRes(res);
  }

  /* Get Tender Work Detail By Tender Datasheet Id */
  async getByTenderDatasheetId(id: number) {
    /* Getting work details */
    const res: any = await prisma.tender_work_details.findFirst({
      where: {
        tender_datasheet_id: id,
      },
      select: {
        tender_datasheet_id: true,
        work_title: true,
        description: true,
        pre_qualification_details: true,
        product_categories: true,
        product_sub_category: true,
        contract_type: true,
        tender_value: true,
        bid_validity: true,
        completion_period: true,
        work_location: true,
        pin_code: true,
        pre_bid_meeting: true,
        bid_opening_place: true,
        pre_bid_meeting_place: true,
        pre_bid_meeting_address: true,
        tenderer_class: true,
        inviting_officer_name: true,
        inviting_officer_address: true,
        inviting_officer_contact: true,
      },
    });

    return generateRes(res);
  }
}

export default TenderWorkDetailsDao;
