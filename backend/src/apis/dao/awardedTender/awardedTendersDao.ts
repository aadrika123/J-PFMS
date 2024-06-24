/**
 * | Author- Sanjiv Kumar
 * | Created On- 22-06-2024
 * | Status- open
 * | Created For- Awarded Tender
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

const joinStringValues = (items: []) => {
  const datesWrappedInQuotes = items.map((item) => `'${item}'`);
  const withCommasInBetween = datesWrappedInQuotes.join(",");
  return withCommasInBetween;
};

class AwardedTendersDao {
  async create(data: any) {
    const res = await prisma.awarded_tenders.create({
      data: data,
    });

    return generateRes(res);
  }

  ///// Get Awarded Tender By Id ////
  async getById(id: number) {
    const res = await prisma.awarded_tenders.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        tender_datasheet: {
          select: {
            project_proposal: {
              select: {
                title: true,
                description: true,
              },
            },
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
    pp.district_id,
    pt.name as type,
    ms.name as state_name,
    um.ulb_name,
    dm.department_name as execution_body_name,
    dm.id as execution_body,
    td.id as tender_datasheet_id,
    at.id as awarded_tender_id,
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
    department_masters as dm on dm.id = pp.execution_body
    left join
    project_types as pt on pt.id = pp.type_id
    left join
    tender_datasheets as td on td.project_proposal_id = pp.id
    left join 
    awarded_tenders as at on at.tender_datasheet_id = td.id
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
    pp.district_id,
    pt.name,
    ms.name,
    um.ulb_name,
    dm.department_name,
    td.id,
    at.id,
    dm.id`;

    const { data, doc } = await prisma.$transaction(async (tx) => {
      const data: any[] = await tx.$queryRawUnsafe<[]>(query);

      /* Getting All Documents Regarding Purticular Projects */
      const td_id = data[0]?.tender_datasheet_id;
      const doc = await tx.$queryRaw`
      select
      ppd.path,
      null as file_token,
      ppd.description as file_name
      from
      project_proposal_documents as ppd
      left join 
      tender_basic_details as tbs on tbs.tender_datasheet_id = ${td_id}
      left join 
      tender_cover_details as tcd on tcd.tender_datasheet_id = ${td_id}
      left join
      tender_documents as tds on tds.reference_id in (tbs.id, tcd.id, ${td_id})
      where project_proposal_id = ${data[0]?.id}
    `;
      return { data, doc };
    });

    const newData = data[0];
    newData.files = doc;

    return newData;
  };

  ///// Getting all awarded tender form details by Id
  async get(id: number) {
    const res: any[] = await prisma.$queryRaw`
    select
    at.id,
    at.status,
    jsonb_build_object(
        'awarded_tender_id', at.id,
        'work_title', pp.title,
        'description', pp.description,
        'project_number', pp.project_proposal_no,
        'project_cost', apd.project_cost
    ) AS project_details,

    jsonb_build_object(
    'awarded_tender_id', at.id,
    'contractor_name', atd.contractor_name,
    'agreement_type', jsonb_build_object(
      'id', agree_type.id,
      'name', agree_type.name
    ),
    'agreement_no', atd.agreement_no,
    'agreement_date', atd.agreement_date,
    'work_order_no', atd.work_order_no,
    'awarding_authority', atd.awarding_authority,
    'quoted_amount', atd.quoted_amount,
    'quoted_percentage', atd.quoted_percentage,
    ) as tender_details,

    jsonb_build_object(
    'awarded_tender_id', at.id,
    'start_date', ap_duration.start_date,
    'end_date', ap_duration.end_date,
    'wp_in_month', ap_duration.wp_in_month,
    'wp_in_day', ap_duration.wp_in_day
    ) as project_duration,

    jsonb_build_object(
      'awarded_tender_id', at.id,
      'boqs', jsonb_agg(
        jsonb_build_object(
          'description', abq.description,
          'item_no', abq.item_no,
          'length', abq.length,
          'breadth', abq.breadth,
          'height', abq.height,
          'height', abq.height,
          'quantity', abq.quantity,
          'unit', abq.unit,
          'sor_rate', abq.sor_rate,
          'amount', abq.amount,
          'remarks', abq.remarks
        )
      )
    ) as awarded_boqs,

    jsonb_build_object(
      'awarded_tender_id', at.id,
      jsonb_agg(
        jsonb_build_object(
          'start_date',apm.start_date,
          'end_date', apm.end_date,
          'amount', apm.amount,
          'percentage', apm.percentage
        )
      ) as milestones
    ) as awarded_milestones

    from 
    awarded_tenders as at
    left join tender_datasheets as td on td.id = ${id}
    left join project_proposals as pp on pp.id = td.project_proposal_id

    left join awarded_project_details as apd on apd.awarded_tender_id = at.id

    left join awarded_tender_details as atd on atd.awarded_tender_id = at.id
    left join agreement_types as agree_type on agree_type.id = at.agreement_type_id

    left join awarded_project_durations as ap_duration on ap_duration.awarded_tender_id = at.id
    left join awarded_boqs as abq on apq.awarded_tender_id = at.id
    left join awarded_project_milestones as apm on apm.awarded_tender_id = at.id

    where at.id = ${id}
    group by 
    at.id,
    at.status,
    pp.title,
    pp.description,
    pp.project_proposal_no,
    apd.project_cost,

    atd.contractor_name,
    agree_type.id,
    agree_type.name,

    atd.agreement_no,
    atd.agreement_date,
    atd.work_order_no,
    atd.awarding_authority,
    atd.quoted_amount,
    atd.quoted_percentage,

    ap_duration.start_date,
    ap_duration.end_date,
    ap_duration.wp_in_month,
    ap_duration.wp_in_day,
  
    abq.description,
    abq.item_no,
    abq.length,
    abq.breadth,
    abq.height,
    abq.height,
    abq.quantity,
    abq.unit,  
    abq.sor_rate,
    abq.amount,
    abq.remarks
    
    apm.start_date,
    apm.end_date,
    apm.amount,
    apm.percentage
    `;

    return generateRes(res[0]);
  }

  /////// Updating the status draft to published
  async update(id: number) {
    const res = await prisma.awarded_tenders.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });

    return generateRes(res);
  }

  ////// Getting All Awarded Tenders //////////
  getAllApprovedTendersDatasheet = async (
    filters: any,
    page: number,
    limit: number,
    order: number
  ): Promise<any> => {
    let query = `
      from tender_datasheets as td
      left join
      project_proposals as pp on pp.id = td.project_proposal_id
      left join ulb_masters um on pp.ulb_id = um.id 
      left join project_types pt on pp.type_id = pt.id 
      left join project_propo_ward_maps as ppwm on ppwm.project_proposal_id = pp.id
      left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
      left join awarded_tenders as ats on ats.tender_datasheet_id = td.id
      left join awarded_project_durations as apd on apd.awarded_tender_id = ats.id
      left join awarded_tender_details as atd on atd.awarded_tender_id = ats.id
      where td.is_approved = true
      `;

    const grouping = "group by td.id, um.ulb_name, pt.name, td.status";

    const queryForCount = `
    from tender_datasheets td
    where td.is_approved = true
    `;

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
      prisma.$queryRawUnsafe(`select td.id, pp.project_proposal_no, pp.title, pp.ulb_id, um.ulb_name, pp.type_id, case when ats.status is not null then ats.status else 'not-initiated' end as status, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
      prisma.$queryRawUnsafe<[CountQueryResult]>(
        `select count(*) ${queryForCount}`
      ),
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
}

export default AwardedTendersDao;
