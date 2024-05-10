import { PrismaClient } from "@prisma/client";

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

  async get(filters: any, page: number, limit: number, order: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = "from project_proposals where true";

      // add project proposal no filters to query
      const project_proposal_no_filters = filters['project_proposal_no'];
      
      let project_proposal_no_filters_is_string : boolean = true;
      if (project_proposal_no_filters) {
        if (typeof project_proposal_no_filters == 'string'){
          query += ` and project_proposal_no ilike '%${project_proposal_no_filters}%'`;
        }
          else{
            query += ` and project_proposal_no in (${joinStringValues(project_proposal_no_filters)})`;
            project_proposal_no_filters_is_string = false;
          }
      }


      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;
  

      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe(`select * ${query} order by id ${ordering}
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
        
        if(project_proposal_no_filters_is_string)
          result['project_proposal_no'] = project_proposal_nos;

        console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

      

    });
  }
}

export default ProjectManagementDao;
