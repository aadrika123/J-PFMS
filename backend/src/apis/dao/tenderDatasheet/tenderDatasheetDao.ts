/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-06-2024
 * | Status- open
 * | Created For- Tender Datasheet
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

type approvalDataType = {
  user_id: number;
  checker_level: number;
  assigned_level: number;
  comment: string;
};

interface CountQueryResult {
  count: string;
}

const joinStringValues = (items: []) => {
  const datesWrappedInQuotes = items.map((item) => `'${item}'`);
  const withCommasInBetween = datesWrappedInQuotes.join(",");
  return withCommasInBetween;
};

class TenderDatasheetsDao {
  async create(data: any) {
    const res = await prisma.tender_datasheets.create({
      data: data,
    });

    return generateRes(res);
  }

  ///// Get Tender Datasheet By Id ////
  async getById(id: number) {
    // const res = await prisma.$queryRaw`
    // select
    // td.id,
    // td.status,
    // jsonb_build_object(
    //   'id', pp.id,
    //   'title', pp.title,
    //   'description', pp.description
    // )
    // from tender_datasheets as td
    // left join project_proposals as pp on pp.id = td.project_proposal_id
    // left join (
    //   select max(tfa.assigned_level), tfa.tender_datasheet_id from tender_form_approvals as tfa group by tfa.tender_datasheet_id
    // ) as x on x.tender_datasheet_id = td.id
    // where td.id = ${id}
    // `

    // console.log("first", res1)

    const res = await prisma.tender_datasheets.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        project_proposal: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });

    return generateRes(res);
  }

  ////// Get Project Propsal By Id ////
  getProjectProposalById = async (id: number): Promise<[]> => {
    // case when x.max is null then 1 else x.max end as assigned_level,

    const query = `select 
    pp.id,
    pp.title, 
    pp.description, 
    pp.address, 
    pp.proposed_date, 
    pp.pin_code, 
    pp.project_proposal_no,
    pp.proposed_by,
    pp.type_id,
    pp.state_id,
    pp.ulb_id,
    pp.ward_id,
    pp.district_id,
    pt.name as type,
    ms.name as state_name,
    tfa.assigned_level,
    um.ulb_name,
    uwm.ward_name,
    dm.department_name as execution_body_name,
    dm.id as execution_body,
    td.id as tender_datasheet_id,
    jsonb_agg(
      jsonb_build_object(
        'id', ppwms.id,
        'ward_id', ppwms.ward_id,
        'ward_name', ppwms.ward_name
      )
    ) as wards
    from project_proposals as pp
    left join
    m_states as ms on ms.id = pp.state_id
    left join
    ulb_masters as um on um.id = pp.ulb_id
    left join
    ulb_ward_masters as uwm on uwm.id = pp.ward_id
    left join
    department_masters as dm on dm.id = pp.execution_body
    left join
    project_types as pt on pt.id = pp.type_id
    left join
    tender_datasheets as td on td.project_proposal_id = pp.id
    left join 
    tender_form_approvals as tfa on tfa.id in (select max(id) from tender_form_approvals where tender_datasheet_id = td.id)
    left join 
    (
      select ppwm.id, ppwm.project_proposal_id, puwm.ward_name, ppwm.ward_id
      from 
      project_propo_ward_maps as ppwm
      left join
      ulb_ward_masters as puwm on puwm.id = ppwm.ward_id
      order by puwm.ward_name desc
    ) as ppwms on ppwms.project_proposal_id = pp.id
    where pp.id=${id}
    GROUP BY
    pp.id, 
    pp.title, 
    pp.description, 
    pp.address, 
    pp.proposed_date, 
    pp.pin_code, 
    pp.project_proposal_no,
    pp.proposed_by,
    pp.type_id,
    pp.state_id,
    pp.ulb_id,
    pp.ward_id,
    pp.district_id,
    pt.name,
    ms.name,
    um.ulb_name,
    uwm.ward_name,
    dm.department_name,
    td.id,
    tfa.assigned_level,
    dm.id`;
    const data: any = await prisma.$queryRawUnsafe<[]>(query);
    const doc: any = await prisma.$queryRaw`
    select
    path,
    null as file_token,
    description as file_name
    from
    project_proposal_documents
    where project_proposal_id = ${data[0]?.id}
    `;

    const newData = data[0];
    newData.file = doc[0];

    return newData;
  };

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
      'tender_datasheet_id', td.id,
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
  async update(id: number, approvalData: approvalDataType) {
    const data = {
      tender_datasheet_id: id,
      checker_id: approvalData.user_id,
      checker_level: approvalData.checker_level,
      assigned_level: approvalData.assigned_level,
      comment: approvalData.comment,
      status: "pending",
    };
    const res = await prisma.$transaction(async (tx) => {
      await tx.tender_form_approvals.create({
        data,
      });
      /* Updating status */
      return await tx.tender_datasheets.update({
        where: {
          id,
        },
        data: {
          status: "submitted",
        },
      });
    });

    return generateRes(res);
  }

  ////// Getting Inbox Data For Level One //////////
  getAllForFirstLevelInbox = async (
    filters: any,
    page: number,
    limit: number,
    order: number
  ): Promise<any> => {
    let query = `from project_proposals p 
      left join ulb_masters um on p.ulb_id = um.id 
      left join project_types pt on p.type_id = pt.id 
      left join (
        select ppwm.id, ppwm.ward_id, ppwm.project_proposal_id, ppuwm.ward_name from project_propo_ward_maps as ppwm
        left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
          ) as ppwml on ppwml.project_proposal_id = p.id
          left join tender_datasheets as td on td.project_proposal_id = p.id
          left join tender_form_approvals as tfa on tfa.tender_datasheet_id = td.id
          where p.fully_approved = true and case when td.status is not null then td.status != 'submitted' and td.status != 'rejected' else true end
      `;

    const grouping = "group by p.id, um.ulb_name, pt.name, td.status";

    const queryForCount = `
    from project_proposals p 
    left join tender_datasheets as td on td.project_proposal_id = p.id
    where p.fully_approved = true and case when td.status is not null then td.status != 'submitted' and td.status != 'rejected' else true end
    `

    // add project proposal no filters to query
    const project_proposal_no_filters = filters["project_proposal_no"];

    let project_proposal_no_filters_is_string: boolean = true;
    if (project_proposal_no_filters) {
      if (typeof project_proposal_no_filters == "string") {
        query += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
      } else {
        query += ` and project_proposal_no in (${joinStringValues(
          project_proposal_no_filters
        )})`;
        project_proposal_no_filters_is_string = false;
      }
    }

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    // fetch the data
    const [records, c, project_proposal_nos] = await prisma.$transaction([
      prisma.$queryRawUnsafe(`select p.id, p.project_proposal_no, p.proposed_date, p.title, p.ulb_id, um.ulb_name, p.type_id, case when td.status is not null then td.status else 'not-initiated' end as status, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
      prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
      prisma.$queryRawUnsafe<string[]>(
        `select distinct(project_proposal_no) ${query} order by project_proposal_no asc limit 10`
      ),
    ]);

    const result: any = {};
    const count = Number(c[0]?.count);

    result["count"] = count;
    result["totalPage"] = Math.ceil(count / limit);
    result["currentPage"] = page;
    result["records"] = records;

    if (project_proposal_no_filters_is_string)
      result["project_proposal_no"] = project_proposal_nos;

    return generateRes(result);
  };

  ////// Getting Inbox Data For Higher Level //////////
  getAllForHigherLevelInbox = async (
    filters: any,
    page: number,
    limit: number,
    order: number,
    level: number
  ): Promise<any> => {
    let query = `
    from tender_form_approvals as tfa
    left join tender_datasheets as td on td.id = tfa.tender_datasheet_id
    left join project_proposals as pp on pp.id = td.project_proposal_id
    left join ulb_masters um on pp.ulb_id = um.id 
    left join project_types pt on pp.type_id = pt.id 
    left join (
      select ppwm.id, ppwm.ward_id, ppwm.project_proposal_id, ppuwm.ward_name from project_propo_ward_maps as ppwm
      left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
    ) as ppwml on ppwml.project_proposal_id = pp.id
    where tfa.assigned_level = ${level} and tfa.status = 'pending'
    `;

    const queryForCount = `
    from tender_form_approvals as tfa
    left join tender_datasheets as td on td.id = tfa.tender_datasheet_id
    where tfa.assigned_level = ${level} and tfa.status = 'pending'
    `

    const grouping = "group by pp.id, um.ulb_name, pt.name, tfa.status";

    // add project proposal no filters to query
    const project_proposal_no_filters = filters["project_proposal_no"];

    let project_proposal_no_filters_is_string: boolean = true;
    if (project_proposal_no_filters) {
      if (typeof project_proposal_no_filters == "string") {
        query += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
      } else {
        query += ` and project_proposal_no in (${joinStringValues(
          project_proposal_no_filters
        )})`;
        project_proposal_no_filters_is_string = false;
      }
    }

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    // fetch the data
    const [records, c, project_proposal_nos] = await prisma.$transaction([
      prisma.$queryRawUnsafe(`select pp.id, pp.project_proposal_no, pp.proposed_date, pp.title, pp.ulb_id, um.ulb_name, pp.type_id, tfa.status, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
      prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
      prisma.$queryRawUnsafe<string[]>(
        `select distinct(project_proposal_no) ${query} order by project_proposal_no asc limit 10`
      ),
    ]);

    const result: any = {};
    const count = Number(c[0]?.count);

    result["count"] = count;
    result["totalPage"] = Math.ceil(count / limit);
    result["currentPage"] = page;
    result["records"] = records;

    if (project_proposal_no_filters_is_string)
      result["project_proposal_no"] = project_proposal_nos;

    return generateRes(result);
  };

  ////// Getting Outbox Data For Higher Level //////////
  getAllForAllLevelOutbox = async (
    filters: any,
    page: number,
    limit: number,
    order: number,
    level: number
  ): Promise<any> => {
    let query = `
    from tender_form_approvals as tfa
    left join tender_datasheets as td on td.id = tfa.tender_datasheet_id
    left join project_proposals as pp on pp.id = td.project_proposal_id
    left join ulb_masters um on pp.ulb_id = um.id 
    left join project_types pt on pp.type_id = pt.id 
    left join (
      select ppwm.id, ppwm.ward_id, ppwm.project_proposal_id, ppuwm.ward_name from project_propo_ward_maps as ppwm
      left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
    ) as ppwml on ppwml.project_proposal_id = pp.id
    where tfa.assigned_level = ${level} and tfa.status != 'rejected'
    `;

    const queryForCount = `
    from tender_form_approvals as tfa
    left join tender_datasheets as td on td.id = tfa.tender_datasheet_id
    where tfa.assigned_level = ${level} and tfa.status != 'rejected'
    `

    const grouping = "group by pp.id, um.ulb_name, pt.name, tfa.status";

    // add project proposal no filters to query
    const project_proposal_no_filters = filters["project_proposal_no"];

    let project_proposal_no_filters_is_string: boolean = true;
    if (project_proposal_no_filters) {
      if (typeof project_proposal_no_filters == "string") {
        query += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
      } else {
        query += ` and project_proposal_no in (${joinStringValues(
          project_proposal_no_filters
        )})`;
        project_proposal_no_filters_is_string = false;
      }
    }

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    // fetch the data
    const [records, c, project_proposal_nos] = await prisma.$transaction([
      prisma.$queryRawUnsafe(`select pp.id, pp.project_proposal_no, pp.proposed_date, pp.title, pp.ulb_id, um.ulb_name, pp.type_id,tfa.status, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
      prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
      prisma.$queryRawUnsafe<string[]>(
        `select distinct(project_proposal_no) ${query} order by project_proposal_no asc limit 10`
      ),
    ]);

    const result: any = {};
    const count = Number(c[0]?.count);

    result["count"] = count;
    result["totalPage"] = Math.ceil(count / limit);
    result["currentPage"] = page;
    result["records"] = records;

    if (project_proposal_no_filters_is_string)
      result["project_proposal_no"] = project_proposal_nos;

    return generateRes(result);
  };

  ////// Getting Rejected Data For Higher Level //////////
  getAllForAllLevelRejected = async (
    filters: any,
    page: number,
    limit: number,
    order: number,
    level: number
  ): Promise<any> => {
    let query = `
    from tender_form_approvals as tfa
    left join tender_datasheets as td on td.id = tfa.tender_datasheet_id
    left join project_proposals as pp on pp.id = td.project_proposal_id
    left join ulb_masters um on pp.ulb_id = um.id 
    left join project_types pt on pp.type_id = pt.id 
    left join (
      select ppwm.id, ppwm.ward_id, ppwm.project_proposal_id, ppuwm.ward_name from project_propo_ward_maps as ppwm
      left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
    ) as ppwml on ppwml.project_proposal_id = pp.id
    where tfa.assigned_level = ${1} and checker_level >= ${level} and tfa.id in (select max(id) from tender_form_approvals where tender_datasheet_id = td.id) and tfa.status = 'rejected'
    `;

    const queryForCount = `
    from tender_form_approvals as tfa
    left join tender_datasheets as td on td.id = tfa.tender_datasheet_id
    where tfa.assigned_level = ${1} and checker_level >= ${level} and tfa.id in (select max(id) from tender_form_approvals where tender_datasheet_id = td.id) and tfa.status = 'rejected'
    `

    const grouping = "group by pp.id, um.ulb_name, pt.name, td.status";

    // add project proposal no filters to query
    const project_proposal_no_filters = filters["project_proposal_no"];

    let project_proposal_no_filters_is_string: boolean = true;
    if (project_proposal_no_filters) {
      if (typeof project_proposal_no_filters == "string") {
        query += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
      } else {
        query += ` and project_proposal_no in (${joinStringValues(
          project_proposal_no_filters
        )})`;
        project_proposal_no_filters_is_string = false;
      }
    }

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    // fetch the data
    const [records, c, project_proposal_nos] = await prisma.$transaction([
      prisma.$queryRawUnsafe(`select pp.id, pp.project_proposal_no, pp.proposed_date, pp.title, pp.ulb_id, um.ulb_name, pp.type_id, case when td.status is not null then td.status else 'not-initiated' end as status, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
      prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
      prisma.$queryRawUnsafe<string[]>(
        `select distinct(project_proposal_no) ${query} order by project_proposal_no asc limit 10`
      ),
    ]);

    const result: any = {};
    const count = Number(c[0]?.count);

    result["count"] = count;
    result["totalPage"] = Math.ceil(count / limit);
    result["currentPage"] = page;
    result["records"] = records;

    if (project_proposal_no_filters_is_string)
      result["project_proposal_no"] = project_proposal_nos;

    return generateRes(result);
  };

  getComments = async (tenderDatasheetId: number) => {
    const res = await prisma.$queryRaw`
      select 
      tfa.checker_id, 
      tfa.comment, 
      tfa.created_at, 
      u.user_name, 
      STRING_AGG(wr.role_name, ', ') as roles
      from tender_form_approvals as tfa
      left join users as u on u.id = tfa.checker_id
      left join wf_roleusermaps as wrm on wrm.user_id = tfa.checker_id
      left join wf_roles as wr on wr.id = wrm.wf_role_id
      where tfa.tender_datasheet_id=${tenderDatasheetId}
      group by tfa.checker_id, tfa.comment, tfa.created_at, u.user_name
      order by tfa.created_at desc
      `;

    return generateRes(res);
  };

  forward = async (id: number, approvalData: approvalDataType) => {
    const data = {
      tender_datasheet_id: id,
      checker_id: approvalData.user_id,
      checker_level: approvalData.checker_level,
      assigned_level: approvalData.assigned_level,
      comment: approvalData.comment,
      status:
        approvalData.checker_level === 3 ? "sent for tendering" : "pending",
    };
    const res = await prisma.$transaction(async (tx) => {
      await tx.tender_form_approvals.create({
        data,
      });
      /* Updating status */
      return await tx.tender_form_approvals.updateMany({
        where: {
          tender_datasheet_id: id,
          assigned_level: {
            lte: approvalData.assigned_level - 1,
          },
          status: {
            in: ["pending", "approved"],
          },
        },
        data: {
          status:
            approvalData.checker_level === 3
              ? "sent for tendering"
              : "approved",
        },
      });
    });

    return generateRes(res);
  };

  sendBack = async (id: number, approvalData: approvalDataType) => {
    const data = {
      tender_datasheet_id: id,
      checker_id: approvalData.user_id,
      checker_level: approvalData.checker_level,
      assigned_level: approvalData.assigned_level,
      comment: approvalData.comment,
      status: "rejected",
    };
    const res = await prisma.$transaction(async (tx) => {
      await tx.tender_form_approvals.create({
        data,
      });
      /* Updating status */
      await tx.tender_form_approvals.updateMany({
        where: {
          tender_datasheet_id: id,
        },
        data: {
          status: "rejected",
        },
      });

      return await tx.tender_datasheets.update({
        where: {
          id,
        },
        data: {
          status: "rejected",
        },
      });
    });

    return generateRes(res);
  };
}

export default TenderDatasheetsDao;
