/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-06-2024
 * | Status- open
 * | Created For- Tender Datasheet
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class TenderDatasheetsDao {
  async create(data: any) {
    const res = await prisma.tender_datasheets.create({
      data: data,
    });

    return generateRes(res);
  }

  ///// Get Tender Datasheet By Id ////
  async getById(id: number) {
    const res = await prisma.tender_datasheets.findFirst({
      where:{
        id
      },
      select: {
        id: true
      }
    })

    return generateRes(res);
  }

  ///// Getting all tender form details by Id
  async get(id: number) {
    const res: any[] = await prisma.$queryRaw`
    select
    td.id,
    td.status,
    jsonb_build_object(
        'tender_datasheet_id', td.id,
        'reference_no', tbd.reference_no,
        'contract_forms', tbd.contract_forms,
        'tender_type', tbd.tender_type,
        'tender_categories', tbd.tender_categories,
        'allow_resubmission', tbd.allow_resubmission,
        'allow_withdrawal', tbd.allow_withdrawal,
        'allow_offline_submission', tbd.allow_offline_submission,
        'payment_mode', tbd.payment_mode,
        'bank', case when b.id is not null then jsonb_build_object(
          'id', b.id,
          'name', b.name
        ) else null end,
        'instrument', tbd.instrument,
        'file', jsonb_build_object(
            'path', tbd_td.path,
            'file_name', tbd_td.file_name,
            'size', tbd_td.size
        )
    ) AS basic_details,

    jsonb_build_object(
    'tender_datasheet_id', td.id,
    'cover_no', tcd.cover_no,
    'content', tcd.content,
    'files', COALESCE (jsonb_agg(
      DISTINCT jsonb_build_object(
        'type', tcd_td.type,
        'path', tcd_td.path,
        'file_name', tcd_td.file_name,
        'size', tcd_td.size 
      )
    ) filter (where tcd_td.path is not null))
    ) as cover_details,

    jsonb_build_object(
    'tender_datasheet_id', td.id,
    'work_title', twd.work_title,
    'description', twd.description,
    'pre_qualification_details', twd.pre_qualification_details,
    'product_categories', twd.product_categories,
    'product_sub_category', twd.product_sub_category,
    'contract_type', twd.contract_type,
    'tender_value', twd.tender_value,
    'bid_validity', twd.bid_validity,
    'completion_period', twd.completion_period,
    'work_location', twd.work_location,
    'pin_code', twd.pin_code,
    'pre_bid_meeting', twd.pre_bid_meeting,
    'bid_opening_place', twd.bid_opening_place,
    'pre_bid_meeting_place', twd.pre_bid_meeting_place,
    'pre_bid_meeting_address', twd.pre_bid_meeting_address,
    'tenderer_class', twd.tenderer_class,
    'inviting_officer_name', twd.inviting_officer_name,
    'inviting_officer_address', twd.inviting_officer_address,
    'inviting_officer_contact', twd.inviting_officer_contact
    ) as work_details,

    jsonb_build_object(
    'tender_datasheet_id', td.id,
    'tender_fee_examption_allowed', tfd.tender_fee_examption_allowed,
    'tender_fee', tfd.tender_fee,
    'processing_fee', tfd.processing_fee,
    'tender_fee_payable_to', tfd.tender_fee_payable_to,
    'tender_fee_payable_at', tfd.tender_fee_payable_at,
    'surcharges', tfd.surcharges,
    'other_charges', tfd.other_charges,
    'emd_examption_allowed', tfd.emd_examption_allowed       ,
    'emd_fee_type', tfd.emd_fee_type,
    'fixed_emd_fee', tfd.fixed_emd_fee,
    'percentage_emd_fee', tfd.percentage_emd_fee,
    'emd_fee_payable_to', tfd.emd_fee_payable_to,
    'emd_fee_payable_at', tfd.emd_fee_payable_at
    ) as fee_details,

    jsonb_build_object(
    'tender_datasheet_id', td.id,
    'publishing_date',tcdates.publishing_date,
    'bid_opening_date', tcdates.bid_opening_date,
    'document_sale_start_date', tcdates.document_sale_start_date,
    'document_sale_end_date', tcdates.document_sale_end_date,
    'seek_clarification_start_date', tcdates.seek_clarification_start_date,
    'seek_clarification_end_date',tcdates.seek_clarification_end_date,
    'bid_submission_start_date', tcdates.bid_submission_start_date,
    'bid_submission_end_date', tcdates.bid_submission_end_date,
    'pre_bid_meeting_date', tcdates.pre_bid_meeting_date
    ) as critical_dates,

    jsonb_build_object(
      'bid_openers', jsonb_agg(
        DISTINCT jsonb_build_object(
          'name' , tbo.name,
          'email', tbo.email
        )
      ),
      'files', COALESCE (jsonb_agg(
        DISTINCT jsonb_build_object(
          'description', tbo_td.description,
          'path', tbo_td.path,
          'file_name', tbo_td.file_name,
          'size', tbo_td.size 
        )
      ) filter (where tbo_td.path is not null))
    ) as bid_openers_details


    from 
    tender_datasheets as td
    left join tender_basic_details as tbd on tbd.tender_datasheet_id = td.id
    left join tender_documents as tbd_td on tbd.id = tbd_td.reference_id and tbd_td.reference_type = 'tender_basic_detail'
    left join banks as b on b.id = tbd.bank_id

    left join tender_cover_details as tcd on tcd.tender_datasheet_id = td.id
    left join tender_documents as tcd_td on tcd.id = tcd_td.reference_id and tcd_td.reference_type = 'tender_cover_detail'

    left join tender_work_details as twd on twd.tender_datasheet_id = td.id

    left join tender_fee_details as tfd on tfd.tender_datasheet_id = td.id

    left join tender_critical_dates as tcdates on tcdates.tender_datasheet_id = td.id

    left join tender_bid_openers as tbo on tbo.tender_datasheet_id = td.id
    left join tender_documents as tbo_td on td.id = tbo_td.reference_id and tbo_td.reference_type = 'tender_bid_opener'
    
    where td.id = ${id}
    group by 
    td.id,
    td.status,
    tbd.reference_no,
    tbd.contract_forms,
    tbd.tender_type,
    tbd.tender_categories,
    tbd.allow_resubmission,
    tbd.allow_withdrawal,
    tbd.allow_offline_submission,
    tbd.payment_mode,
    tbd.instrument,
    tbd_td.path,
    tbd_td.file_name,
    tbd_td.size,
    b.id,
    tcd.cover_no,
    tcd.content,
    twd.work_title,
    twd.description,
    twd.pre_qualification_details,
    twd.product_categories,
    twd.product_sub_category,
    twd.contract_type,
    twd.tender_value,
    twd.bid_validity,
    twd.completion_period,
    twd.work_location,
    twd.pin_code,
    twd.pre_bid_meeting,
    twd.bid_opening_place,
    twd.pre_bid_meeting_place,
    twd.pre_bid_meeting_address,
    twd.tenderer_class,
    twd.inviting_officer_name,
    twd.inviting_officer_address,
    twd.inviting_officer_contact,
    tfd.tender_fee_examption_allowed,
    tfd.tender_fee,
    tfd.processing_fee,
    tfd.tender_fee_payable_to,
    tfd.tender_fee_payable_at,
    tfd.surcharges,
    tfd.other_charges,
    tfd.emd_examption_allowed,
    tfd.emd_fee_type,
    tfd.fixed_emd_fee,
    tfd.percentage_emd_fee,
    tfd.emd_fee_payable_to,
    tfd.emd_fee_payable_at,
    tcdates.publishing_date,
    tcdates.bid_opening_date,
    tcdates.document_sale_start_date,
    tcdates.document_sale_end_date,
    tcdates.seek_clarification_start_date,
    tcdates.seek_clarification_end_date,
    tcdates.bid_submission_start_date,
    tcdates.bid_submission_end_date,
    tcdates.pre_bid_meeting_date
    `;

    return generateRes(res[0]);
  }

  /////// Updating the status draft to published
  async update(id: number) {
    const res = await prisma.tender_datasheets.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });

    return generateRes(res);
  }
}

export default TenderDatasheetsDao;
