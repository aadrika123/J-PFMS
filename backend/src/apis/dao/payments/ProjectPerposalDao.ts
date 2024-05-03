import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

interface CountQueryResult {
  count: string;
}

class project_proposalsDao {


  get = async (ulb: number, date: string, page: number, limit: number, search: string, order: number) => {

    let searchCondition = `ulb_id = ${ulb} and bill_date='${date}'`;

    if (search.length != 0) searchCondition += ` and lower(party_name) like '%${search.toLowerCase()}%'`;

    const ordering = order == -1 ? "desc" : "asc";

    const offset = (page - 1) * limit;

    const query = `select b.id, b.ulb_id, amount, bill_no, bill_date, vm.name as party_name from bills b 
    left join 
    vendor_masters vm on b.party_id = vm.id 
    where ${searchCondition} order by id ${ordering}
    limit ${limit} offset ${offset};`;


    const records = await prisma.$queryRawUnsafe<[]>(query);

    const c = await prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) from bills where ${searchCondition}`);

    const count = Number(c[0]?.count);

    return generateRes(records, count, page, limit);
  }

  create = async (data: any) => {
    console.log(data);
    return await prisma.project_proposals.createMany({
      data: data,
    });
  }

  createOne = async (data: any, docRecords: any) => {

    return prisma.$transaction(
      async (tx) => {

        const project_proposals_record =  await tx.project_proposals.create({data: data});
        if(docRecords.length > 0){
          docRecords.forEach((docRecord: any)=> {
            docRecord.bill_id = project_proposals_record.id
          });

           await tx.project_proposal_documents.createMany({
            data: docRecords
          });
        }
        return project_proposals_record;
      }
    );
  }


  getById = async (id: number) : Promise<[]> => {
    const query = `select b.id, b.ulb_id, amount, bill_no, bill_date, vm.name as party_name from bills b 
    left join 
    vendor_masters vm on b.party_id = vm.id 
    where b.id=${id}`;
    const data =  await prisma.$queryRawUnsafe<[]>(query);
    console.log(data);
    return data;
  }

}

export default project_proposalsDao;
