import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

class project_proposalsDao {
  get = async (
    ulb: number,
    page: number,
    limit: number,
    search: string,
    order: number
  ) => {
    let searchCondition = "";
    if (ulb) searchCondition += `and pp.ulb_id = ${ulb}`;

    if (search.length != 0)
      searchCondition += ` and lower(party_name) like '%${search.toLowerCase()}%'`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select 
    pp.id,
    pp.title, 
    pp.description, 
    pp.address, 
    pp.proposed_date, 
    pp.pin_code, 
    pp.project_proposal_no,
    pp.proposed_by,
    pt.name as type,
    s.name as state_name,
    um.ulb_name,
    uwm.ward_name
    from project_proposals as pp 
    left join 
    m_states as s on s.id = pp.state_id
    left join
    ulb_masters as um on um.id = pp.ulb_id
    left join
    ulb_ward_masters as uwm on uwm.id = pp.ward_id
    left join
    project_types as pt on pt.id = pp.type_id
    where (true ${searchCondition})
    order by pp.id ${ordering}
    limit ${limit} offset ${offset}`;

    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(
      `select count(*) from project_proposals where (true ${searchCondition})`
    );

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  };

  create = async (data: any) => {
    return await prisma.project_proposals.createMany({
      data: data,
    });
  };

  createOne = async (data: any, docRecord: any) => {
    const wards = data.wards;
    delete data.wards;
    return prisma.$transaction(async (tx) => {
      const project_proposals_record = await tx.project_proposals.create({
        data: data,
      });

      if (docRecord) {
        await tx.project_proposal_documents.create({
          data: {...docRecord, project_proposal_id: project_proposals_record.id},
        });
      }
      const wardData = wards.map((i: number) => {
        return { ward_id: i, project_proposal_id: project_proposals_record.id };
      });
      await tx.project_propo_ward_maps.createMany({
        data: wardData,
      });


      await tx.project_proposal_checkings.create({
        data: {
          project_proposal_id: project_proposals_record.id,
          checker_id: project_proposals_record.user_id,
          comment: "Proposal Submitted!",
          at_role_id: 2,  // JUNIOR ENGINEER
          at_role_name: "JUNIOR ENGINEER"
        }
      });

      return project_proposals_record;
    });
  };

  getById = async (id: number): Promise<[]> => {
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
    (
      select ppwm.id, ppwm.project_proposal_id, puwm.ward_name, ppwm.ward_id
      from 
      project_propo_ward_maps as ppwm
      left join
      ulb_ward_masters as puwm on puwm.id = ppwm.ward_id
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

  update = async (id: number, data: any, docRecord: any): Promise<any> => {
    const wards = data.wards;
    delete data.wards;

    return prisma.$transaction(async (tx) => {
      const project_proposals_record = await tx.project_proposals.update({
        where: {
          id,
        },
        data,
      });

      await tx.project_proposal_documents.deleteMany({
        where: {
          project_proposal_id: id,
        },
      });

      const docData = {
        ...docRecord, project_proposal_id: id
      }
      
      await tx.project_proposal_documents.create({
        data: docData,
      });

      if (wards.length) {
        const wardData = wards.map((i: number) => {
          return {
            ward_id: i,
            project_proposal_id: project_proposals_record.id,
          };
        });
        await tx.project_propo_ward_maps.deleteMany({
          where: { project_proposal_id: id },
        });
        await tx.project_propo_ward_maps.createMany({
          data: wardData,
        });
      }
      return project_proposals_record;
    });
  };
}

export default project_proposalsDao;
