import { PrismaClient, project_proposals } from "@prisma/client";

const prisma = new PrismaClient();


interface CountQueryResult {
  count: string;
}

const joinStringValues = (items: []) => {
  const datesWrappedInQuotes = items.map(item => `'${item}'`);
  const withCommasInBetween = datesWrappedInQuotes.join(',')
  return withCommasInBetween
}

class ProjectManagementDao {

  get = async (proposalId: number): Promise<project_proposals | null> => {
    return new Promise((resolve) => {
      prisma.$queryRaw<any[]>`select * from project_proposals 
      where id=${proposalId}`.then((result) => {
        if(result.length == 0)
          resolve(null);
        else
          resolve(result[0]);
      });
    });
  }

getAll = async (filters: any, page: number, limit: number, order: number): Promise<any>  => {
    return new Promise((resolve, reject) => {
      let query = "from project_proposals b left join ulb_masters um on b.ulb_id = um.id where true";

      // add project proposal no filters to query
      const project_proposal_no_filters = filters['project_proposal_no'];

      let project_proposal_no_filters_is_string: boolean = true;
      if (project_proposal_no_filters) {
        if (typeof project_proposal_no_filters == 'string') {
          query += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
        }
        else {
          query += ` and project_proposal_no in (${joinStringValues(project_proposal_no_filters)})`;
          project_proposal_no_filters_is_string = false;
        }
      }


      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;


      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe(`select b.id, b.project_proposal_no, b.date, b.summary, b.ulb_id, um.ulb_name ${query} order by id ${ordering}
        limit ${limit} offset ${offset};`),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${query}`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(project_proposal_no) ${query} order by project_proposal_no asc limit 10`)

      ]).then(([records, c, project_proposal_nos]) => {


        const result: any = {};
        const count = Number(c[0]?.count);

        result['count'] = count;
        result['totalPage'] = Math.ceil(count / limit)
        result['currentPage'] = page;
        result['records'] = records;

        if (project_proposal_no_filters_is_string)
          result['project_proposal_no'] = project_proposal_nos;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }


  getLevel0ExecutiveOfficerInbox = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    level?: number
  ): Promise<any> => {


    // const ddd = await prisma.$queryRawUnsafe("select * from ulb_masters limit 1");
    // console.log(ddd);

    return new Promise((resolve, reject) => {
      // console.log(level);

      
      let filterCondition = `b.ulb_id = ${ulbId} and x.project_proposal_id is null`;

      
      // generate the filter condition for project proposal no
      const project_proposal_no_filters = filters['project_proposal_no'];

      let project_proposal_no_filters_is_string: boolean = true;
      if (project_proposal_no_filters) {
        if (typeof project_proposal_no_filters == 'string') {
          filterCondition += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
        }
        else {
          filterCondition += ` and project_proposal_no in (${joinStringValues(project_proposal_no_filters)})`;
          project_proposal_no_filters_is_string = false;
        }
      }

      // generate the filter condition for ulb name
      const ulb_name_filters = filters['ulb_name'];
      let ulb_name_filters_is_string: boolean = true;
      if(ulb_name_filters){
        if(typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        }else{
          filterCondition += ` and ulb_name in (${joinStringValues(ulb_name_filters)})`;
          ulb_name_filters_is_string = false;
        }
      }


      const queryWithoutFieldsAndPagination = `from project_proposals b 
      left join 
      (
        select project_proposal_id from project_proposal_checkings bc1 where bc1.id in (
          select max(id) from project_proposal_checkings bc2 group by bc2.project_proposal_id
        )
      ) x on b.id = x.project_proposal_id
      left join ulb_masters um on b.ulb_id = um.id
      where ${filterCondition}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const query = `select b.id, b.project_proposal_no, b.date, b.summary, b.ulb_id, um.ulb_name ${queryWithoutFieldsAndPagination} 
      order by b.id ${ordering}
      limit ${limit} offset ${offset};`;

      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe<[]>(query),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryWithoutFieldsAndPagination}`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(project_proposal_no) ${queryWithoutFieldsAndPagination} order by project_proposal_no asc limit 10`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(ulb_name) ${queryWithoutFieldsAndPagination} order by ulb_name asc limit 10`)
      
      ]).then(([records, c, project_proposal_nos, ulb_names]) => {


        const result: any = {};
        const count = Number(c[0]?.count);

        result['count'] = count;
        result['totalPage'] = Math.ceil(count / limit)
        result['currentPage'] = page;
        result['records'] = records;

        if (project_proposal_no_filters_is_string)
          result['project_proposal_no'] = project_proposal_nos;

        if(ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  };



  getHigherLevelOutbox = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    level?: number
  ) : Promise<any> => {

    return new Promise((resolve, reject) => {

      let filterCondition = `b.ulb_id = ${ulbId} and x.approval_stage_id >= ${level}`;
      
      // generate the filter condition for project proposal no
      const project_proposal_no_filters = filters['project_proposal_no'];

      let project_proposal_no_filters_is_string: boolean = true;
      if (project_proposal_no_filters) {
        if (typeof project_proposal_no_filters == 'string') {
          filterCondition += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
        }
        else {
          filterCondition += ` and project_proposal_no in (${joinStringValues(project_proposal_no_filters)})`;
          project_proposal_no_filters_is_string = false;
        }
      }

      // generate the filter condition for ulb name
      const ulb_name_filters = filters['ulb_name'];
      let ulb_name_filters_is_string: boolean = true;
      if(ulb_name_filters){
        if(typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        }else{
          filterCondition += ` and ulb_name in (${joinStringValues(ulb_name_filters)})`;
          ulb_name_filters_is_string = false;
        }
      }


      const queryWithoutFieldsAndPagination = `from project_proposals b 
      left join 
      (
        select project_proposal_id, approval_stage_id from project_proposal_checkings bc1 where bc1.id in (
          select max(id) from project_proposal_checkings bc2 group by bc2.project_proposal_id
        )
      ) x on b.id = x.project_proposal_id
      left join ulb_masters um on b.ulb_id = um.id
      where ${filterCondition}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const query = `select b.id, b.project_proposal_no, b.date, b.ulb_id, um.ulb_name ${queryWithoutFieldsAndPagination} 
      order by b.id ${ordering}
      limit ${limit} offset ${offset};`;

      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe<[]>(query),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryWithoutFieldsAndPagination}`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(project_proposal_no) ${queryWithoutFieldsAndPagination} order by project_proposal_no asc limit 10`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(ulb_name) ${queryWithoutFieldsAndPagination} order by ulb_name asc limit 10`)
      
      ]).then(([records, c, project_proposal_nos, ulb_names]) => {


        const result: any = {};
        const count = Number(c[0]?.count);

        result['count'] = count;
        result['totalPage'] = Math.ceil(count / limit)
        result['currentPage'] = records.length>0?page:1;
        result['records'] = records;

        if (project_proposal_no_filters_is_string)
          result['project_proposal_no'] = project_proposal_nos;

        if(ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });


    });
  }


  acknowledge = async (proposalId: number) => {
    return new Promise((resolve, reject) => {
      prisma.$queryRaw`update project_proposals 
      set acknowledged=true
      where id=${proposalId}`.then((result) => {
        console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  

}

export default ProjectManagementDao;
