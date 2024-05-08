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
    pp.summary, 
    pp.description, 
    pp.address, 
    pp.date, 
    pp.pin_code, 
    pp.project_proposal_no,
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
    console.log(data);
    return await prisma.project_proposals.createMany({
      data: data,
    });
  };

  createOne = async (data: any, docRecords: any) => {
    return prisma.$transaction(async (tx) => {
      const project_proposals_record = await tx.project_proposals.create({
        data: data,
      });
      if (docRecords.length > 0) {
        docRecords.forEach((docRecord: any) => {
          docRecord.project_proposal_id = project_proposals_record.id;
        });

        await tx.project_proposal_documents.createMany({
          data: docRecords,
        });
      }
      return project_proposals_record;
    });
  };

  getById = async (id: number): Promise<[]> => {
    const query = `select 
    id,
    summary, 
    description, 
    address, 
    date, 
    pin_code, 
    project_proposal_no,
    state_id,
    ulb_id,
    ward_id,
    district_id
    from project_proposals
    where id=${id}`;
    const data: any = await prisma.$queryRawUnsafe<[]>(query);
    const doc = await prisma.$queryRaw`
    select
    path,
    null as file_token,
    description as file_name,
    doc_type_id as document_type_id
    from
    project_proposal_documents
    where project_proposal_id = ${data[0]?.id}
    `;
    // const doc = await prisma.project_proposal_documents.findMany({
    //   select: {
    //     path: true,
    //     description: true,
    //   },
    //   where: {
    //     project_proposal_id: data[0]?.id,
    //   },
    // });
    const newData = data[0];
    newData.files = doc;
    return newData;
  };

  update = async (id: number, data: any, docRecords: any): Promise<any> => {
    return prisma.$transaction(async (tx) => {
      const project_proposals_record = await tx.project_proposals.update({
        where: {
          id,
        },
        data,
      });
      if (docRecords.length > 0) {
        await Promise.all(
          docRecords.map(async (docRecord: any) => {
            await tx.project_proposal_documents.updateMany({
              where: {
                project_proposal_id: id,
                doc_type_id: docRecord.doc_type_id,
              },
              data: docRecord,
            });
          })
        );
      }
      return project_proposals_record;
    });
  };
}

export default project_proposalsDao;
