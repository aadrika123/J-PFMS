import { measurements, PrismaClient, project_proposal_checkings, project_proposals } from "@prisma/client";
import { ProjectProposalStages, User } from "pfmslib";
import { generateRes } from "../../util/generateRes";

const prisma = new PrismaClient();


interface CountQueryResult {
  count: string;
}

interface SumQueryResult {
  sum: string;
}


interface SumCountQueryResult {
  count: string;
  sum: string;
}

interface AuthorityLevelResponse {
  name: string,
  authority_level: number
}

interface FullProposalDetails {
  at_role_id: number;
  at_role_name: string;
  checklist: string;
}


const joinStringValues = (items: []) => {
  const datesWrappedInQuotes = items.map(item => `'${item}'`);
  const withCommasInBetween = datesWrappedInQuotes.join(',')
  return withCommasInBetween
}

class ProjectVerificationDao {

  get = async (proposalId: number): Promise<project_proposals | null> => {
    return new Promise((resolve) => {

      prisma.$transaction([
        prisma.$queryRaw<any[]>`select * from project_proposals 
      where id=${proposalId}`,

        prisma.$queryRawUnsafe<project_proposal_checkings[]>(`select * from project_proposal_checkings where id=(
          select max(id) as id from project_proposal_checkings where project_proposal_id=${proposalId})`),

        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) from measurements where proposal_id=${proposalId}`),
      ])
        .then(([records, lastCheckingDetails, c]) => {

          // console.log("lastCheckingDetails", lastCheckingDetails);
          const count = Number(c[0]?.count);

          if (records.length == 0)
            resolve(null);
          else {
            const record = {
              ...records[0],
              measurements_added: count > 0,
              at_role_name: lastCheckingDetails[0].at_role_name
            }
            resolve(record);
          }
        });
    });
  }

  getAll = async (filters: any, page: number, limit: number, order: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      let query = `from project_proposals b 
      left join ulb_masters um on b.ulb_id = um.id 
      left join project_types pt on b.type_id = pt.id 
      left join (
        select ppwm.id, ppwm.ward_id, ppwm.project_proposal_id, ppuwm.ward_name from project_propo_ward_maps as ppwm
        left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
          ) as ppwml on ppwml.project_proposal_id = b.id
          where true
      `;

      const queryForCount = `
      from project_proposals b 
      where true
      `

      const grouping = "group by b.id, um.ulb_name, pt.name";

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
        prisma.$queryRawUnsafe(`select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
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

        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getAll11 = async (filters: any, page: number, limit: number, order: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      let query = `from project_proposals b 
      left join ulb_masters um on b.ulb_id = um.id 
      left join project_types pt on b.type_id = pt.id 
      left join (
        select ppwm.id, ppwm.ward_id, ppwm.project_proposal_id, ppuwm.ward_name from project_propo_ward_maps as ppwm
        left join ulb_ward_masters as ppuwm on ppwm.ward_id = ppuwm.id
          ) as ppwml on ppwml.project_proposal_id = b.id
          left join tender_datasheets as td on td.project_proposal_id = b.id
          where true
      `;

      const queryForCount = `
      from project_proposals b 
      where true
      `

      const grouping = "group by b.id, um.ulb_name, pt.name, td.status";

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
        prisma.$queryRawUnsafe(`select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, case when td.status is not null then td.status else 'not-initiated' end as status, pt.name as type, ARRAY_AGG(ppwml.ward_name::text) as ward_name ${query} ${grouping} order by id ${ordering}
        limit ${limit} offset ${offset};`),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
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

        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }


  getLevel0JuniorEngineerInbox = async (
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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
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
      left join project_types pt on b.type_id = pt.id 
      where ${filterCondition}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type ${queryWithoutFieldsAndPagination} 
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

        if (ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  };


  getHigherLevelInbox = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    level: number
  ): Promise<any> => {

    return new Promise((resolve, reject) => {
      let filterCondition = `b.ulb_id = ${ulbId} and x.approval_stage_id = ${level
        }`;

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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
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
      left join project_types pt on b.type_id = pt.id 
      where ${filterCondition}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type ${queryWithoutFieldsAndPagination} 
      order by b.id ${ordering}
      limit ${limit} offset ${offset};`;

      // fetch the data

      prisma.$transaction([
        prisma.$queryRawUnsafe<[]>(query),
        prisma.$queryRawUnsafe<CountQueryResult[]>(`select count(*) ${queryWithoutFieldsAndPagination}`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(project_proposal_no) ${queryWithoutFieldsAndPagination} order by project_proposal_no asc limit 10`),
        prisma.$queryRawUnsafe<string[]>(`select distinct(ulb_name) ${queryWithoutFieldsAndPagination} order by ulb_name asc limit 10`)
      ]).then(([records, c, project_proposal_nos, ulb_names]) => {
        const result: any = {};
        console.log(c);
        const count = Number(c[0]?.count);

        console.log(count);

        result['count'] = count;
        result['totalPage'] = Math.ceil(count / limit)
        result['currentPage'] = page;
        result['records'] = records;

        if (project_proposal_no_filters_is_string)
          result['project_proposal_no'] = project_proposal_nos;

        if (ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        console.log(result);
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
  ): Promise<any> => {

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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
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

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.ulb_id, um.ulb_name ${queryWithoutFieldsAndPagination} 
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
        result['currentPage'] = records.length > 0 ? page : 1;
        result['records'] = records;

        if (project_proposal_no_filters_is_string)
          result['project_proposal_no'] = project_proposal_nos;

        if (ulb_name_filters_is_string)
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


  getLastProposalCheckingRecordByProposalId = async (proposalId: number) => {
    return new Promise((resolve, reject) => {
      prisma.project_proposal_checkings.aggregate({
        where: {
          id: proposalId,
        },
        _max: {
          id: true,
        },
      }).then((result) => {

        if (result._max.id == null)
          resolve(null);
        else
          resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  };




  forwardProposal = async (user: User, data: any) => {
    return new Promise((resolve, reject) => {
      prisma.$transaction(async (tx) => {

        // fetch the project proposal record combined with latest checkings record

        const proposals = await tx.$queryRaw<FullProposalDetails[]>`select * from project_proposal_checkings c
        left join project_proposals p
        on c.project_proposal_id = p.id
        where c.id in
         (select max(id) from project_proposal_checkings where project_proposal_id=${data.proposalId})
         `;
        const proposal = proposals[0];

        // console.log(proposal);

        // parse the checklist
        const checkListJson = proposal.checklist;
        const checkList = JSON.parse(checkListJson);
        // console.log(checkList);



        // obtain authority level names and power value
        const authorityLevels = await tx.$queryRawUnsafe<AuthorityLevelResponse[]>(`select name, authority_level from roles_in_order where name in (${checkList.map(function (p: string) { return '\'' + p + '\''; }).join(',')})`);
        // convert auth levels to dict
        const authorityLevelDict1: { [key: string]: number } = {};
        const authorityLevelDict2: { [key: number]: string } = {};
        authorityLevels.forEach((item) => {
          console.log(item);
          authorityLevelDict1[item.name] = item.authority_level;
          authorityLevelDict2[item.authority_level] = item.name;
        })
        // console.log(Object.values(authorityLevelDict1));

        // confirm that the person is authorized for the forwarding
        const roles = user.getRoles();
        if (!roles.includes(proposal.at_role_name)) throw Error("Unauthorized operation!");


        // find the next persons role from the checklist
        const currentTablesRole = authorityLevelDict2[proposal.at_role_id];
        const currentTablesRoleIndex = checkList.indexOf(currentTablesRole);

        // confirm that the checklist is not yet complete
        if (currentTablesRoleIndex == checkList.length - 1) throw Error("Already fully approved!");

        const nextTablesRole = checkList[currentTablesRoleIndex + 1];

        const nextTablesRoleId = authorityLevelDict1[nextTablesRole];

        // create a new proposal checkings record with the new role id
        const checkingRecord = {
          project_proposal_id: data?.proposalId,
          checker_id: user?.getUserId(),
          comment: data?.comment,
          at_role_id: nextTablesRoleId,
          at_role_name: nextTablesRole
        };

        const result = await tx.project_proposal_checkings.create({
          data: checkingRecord,
        });


        let fully_approved = false;

        if (currentTablesRoleIndex == checkList.length - 2){
          await tx.project_proposals.update({
            where: {
              id: data?.proposalId
            },
            data: {
              fully_approved: true,
            }
          });

          fully_approved = true;
        }
          

        return {...result, fully_approved};

      }).then((d) => {
        resolve(d);
      }).catch((error) => {
        reject(error);
      });
    });
  };



  sendBackProposal = async (user: User, data: any) => {
    return new Promise((resolve, reject) => {
      prisma.$transaction(async (tx) => {

        // fetch the project proposal record combined with latest checkings record

        const proposals = await tx.$queryRaw<FullProposalDetails[]>`select * from project_proposal_checkings c
        left join project_proposals p
        on c.project_proposal_id = p.id
        where c.id in
         (select max(id) from project_proposal_checkings where project_proposal_id=${data.proposalId})
         `;
        const proposal = proposals[0];

        // console.log(proposal);

        // parse the checklist
        const checkListJson = proposal.checklist;
        const checkList = JSON.parse(checkListJson);
        // console.log(checkList);



        // obtain authority level names and power value
        const authorityLevels = await tx.$queryRawUnsafe<AuthorityLevelResponse[]>(`select name, authority_level from roles_in_order where name in (${checkList.map(function (p: string) { return '\'' + p + '\''; }).join(',')})`);
        // convert auth levels to dict
        const authorityLevelDict1: { [key: string]: number } = {};
        const authorityLevelDict2: { [key: number]: string } = {};
        authorityLevels.forEach((item) => {
          console.log(item);
          authorityLevelDict1[item.name] = item.authority_level;
          authorityLevelDict2[item.authority_level] = item.name;
        })
        // console.log(Object.values(authorityLevelDict1));

        // confirm that the person is authorized for the forwarding
        const roles = user.getRoles();
        if (!roles.includes(proposal.at_role_name)) throw Error("Unauthorized operation!");


        // find the next persons role from the checklist
        const currentTablesRole = authorityLevelDict2[proposal.at_role_id];
        const currentTablesRoleIndex = checkList.indexOf(currentTablesRole);

        // confirm that the checklist is not yet complete
        if (currentTablesRoleIndex == 0) throw Error("Nowhere to send back!");

        const prevTableRole = checkList[currentTablesRoleIndex - 1];

        const prevTableRoleId = authorityLevelDict1[prevTableRole];

        // create a new proposal checkings record with the new role id
        const checkingRecord = {
          project_proposal_id: data?.proposalId,
          checker_id: user?.getUserId(),
          comment: data?.comment,
          at_role_id: prevTableRoleId,
          at_role_name: prevTableRole,
          last_action: "sent_back",
        };

        const result = await tx.project_proposal_checkings.create({
          data: checkingRecord,
        });

        return result;

      }).then((d) => {
        resolve(d);
      }).catch((error) => {
        reject(error);
      });
    });
  };



  recordMeasurements = async (data: measurements[], ref_doc_records: any[]) => {
    const proposalId = data[0].proposal_id;
    return new Promise((resolve, reject) => {

      prisma.$transaction(async (tx) => {

        // insert the reference doc records
        const refDocCreateQueryResult = await tx.measurement_ref_docs.createMany({
          data: ref_doc_records
        });

        // Record the new measurements
        const new_mes = await tx.measurements.createMany({ data: data });

        // Find the total amount
        const sum_query_result = await tx.$queryRaw<[SumQueryResult]>`select sum(amount) from measurements where proposal_id=${proposalId}`;

        console.log("===========================Total amount: ==============================", sum_query_result);

        // Update the checklist, and department_wise_checklist in the proposals table

        const total = Number(sum_query_result[0].sum);

        const newCheckList: string[] = ["BACK OFFICE", "JUNIOR ENGINEER"];
        const engineeringSectionItems: string[] = ["JUNIOR ENGINEER"];
        const adminSectionItems: string[] = [];


        // Engineering Section
        if (total <= 500000) { // Actually the condition is not required
          newCheckList.push("ASSISTANT ENGINEER");
          engineeringSectionItems.push("ASSISTANT ENGINEER");
        }
        else if (total <= 2500000) {
          newCheckList.push("ASSISTANT ENGINEER");
          newCheckList.push("EXECUTIVE ENGINEER");

          engineeringSectionItems.push("ASSISTANT ENGINEER");
          engineeringSectionItems.push("EXECUTIVE ENGINEER");
        }
        else if (total <= 10000000) {
          newCheckList.push("ASSISTANT ENGINEER");
          newCheckList.push("EXECUTIVE ENGINEER");
          newCheckList.push("SUPERINTENDENT ENGINEER");

          engineeringSectionItems.push("ASSISTANT ENGINEER");
          engineeringSectionItems.push("EXECUTIVE ENGINEER");
          engineeringSectionItems.push("SUPERINTENDENT ENGINEER");
        }
        else {
          newCheckList.push("ASSISTANT ENGINEER");
          newCheckList.push("EXECUTIVE ENGINEER");
          newCheckList.push("SUPERINTENDENT ENGINEER");
          newCheckList.push("CHIEF ENGINEER");

          engineeringSectionItems.push("ASSISTANT ENGINEER");
          engineeringSectionItems.push("EXECUTIVE ENGINEER");
          engineeringSectionItems.push("SUPERINTENDENT ENGINEER");
          engineeringSectionItems.push("CHIEF ENGINEER");
        }

        // Admin Section
        if (total <= 2500000) {
          newCheckList.push("DEPUTY MUNICIPAL COMMISSIONER");
          adminSectionItems.push("DEPUTY MUNICIPAL COMMISSIONER");
        }

        else if (total <= 10000000) {
          newCheckList.push("ASSISTANT MUNICIPAL COMMISSIONER");

          adminSectionItems.push("ASSISTANT MUNICIPAL COMMISSIONER");
        }

        else {

          newCheckList.push("ASSISTANT MUNICIPAL COMMISSIONER");
          newCheckList.push("MUNICIPAL COMMISSIONER");

          adminSectionItems.push("ASSISTANT MUNICIPAL COMMISSIONER");
          adminSectionItems.push("MUNICIPAL COMMISSIONER");
        }


        newCheckList.push("READY FOR TENDERING");

        const newCheckListDepartmentWise = {
          "Back Office": ["BACK OFFICE"],
          "Technical Approval": engineeringSectionItems,
          "Administrative Approval": adminSectionItems,
          "Finished": ["READY FOR TENDERING"],
        };

        const pp = tx.$queryRaw`update project_proposals set 
        checklist=${JSON.stringify(newCheckList)}, 
        department_wise_checklist=${JSON.stringify(newCheckListDepartmentWise)} 
        where id=${proposalId}`;

        return pp;
      }).then((d) => {
        resolve(d);
      }).catch((error) => {
        reject(error);
      });




    })
  };

  getMeasurements = async (proposal_id: number, filters: any, page: number, limit: number, order: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      const query = `from measurements where proposal_id=${proposal_id}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe(`select * ${query} order by id ${ordering} limit ${limit} offset ${offset}`),
        prisma.$queryRawUnsafe<[SumCountQueryResult]>(`select count(*), sum(amount) ${query}`),
        // prisma.$queryRawUnsafe<[SumQueryResult]>(`select sum(amount)  ${query}`),
      ]).then(([records, sc]) => {

        const count = Number(sc[0]?.count);
        const sum = Number(sc[0]?.sum);

        const result = {
          count: count,
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          totalAmount: sum,
          records: records
        };

        resolve(result);


      }).catch((error) => {
        reject(error);
      })
    });
  }

  getScheduleOfRates = async (search: string | undefined) => {
    return new Promise((resolve, reject) => {

      const query = search ?
        `select * from schedule_of_rates where description ilike '%${search}%' or sno ilike '%${search}%' limit 10` :
        `select * from schedule_of_rates limit 10`;

      prisma.$transaction([
        prisma.$queryRawUnsafe(query)
      ]).then(([records]) => {
        resolve(records);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateMeasurement = async (data: measurements) => {
    return new Promise((resolve, reject) => {
      prisma.measurements.update({
        where: {
          id: data.id,
        },
        data: data
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });
  }

  getDocumentList = async (proposalId: number) => {
      const result = await prisma.$queryRaw`select * from project_proposal_documents where project_proposal_id=${proposalId}`;
      return result;
  }

  getComments = async (proposalId: number) => {
    return new Promise((resolve, reject) => {
      prisma.$queryRaw`

      select c.checker_id, c.comment, c.last_action, c.created_at, uu.user_name, uu.roles as "role"
      from project_proposal_checkings c
      left join 
      (
        select u.id, STRING_AGG(u.name, ', ') as user_name, STRING_AGG(r.role_name, ', ') as roles 
        from users u 
        left join
        (
          select rm.wf_role_id, rm.user_id, rl.role_name from wf_roleusermaps rm
          left join wf_roles rl
          on rm.wf_role_id = rl.id
        ) r 
        on u.id = r.user_id
        group by u.id
      ) uu
      on c.checker_id = uu.id
      where c.project_proposal_id=${proposalId}
      order by c.created_at desc

      `.then((result) => {

        console.log(result);

        console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }




  getInbox = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    roles: string[]
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      // console.log(level);

      let filterCondition = `b.ulb_id = ${ulbId}`;


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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
          filterCondition += ` and ulb_name in (${joinStringValues(ulb_name_filters)})`;
          ulb_name_filters_is_string = false;
        }
      }

      const queryWithoutFieldsAndPagination = `from project_proposal_checkings c 
      left join project_proposals b on c.project_proposal_id = b.id 
      left join ulb_masters um on b.ulb_id = um.id
      left join project_types pt on b.type_id = pt.id 
      left join project_propo_ward_maps as ppwm on ppwm.project_proposal_id = b.id
      left join ulb_ward_masters uwm on uwm.id = ppwm.ward_id
      
      
      where c.at_role_id in (
        select authority_level from roles_in_order where name in (${roles.map(function (p) { return '\'' + p + '\''; }).join(',')})
      ) and c.id in (
        select max(id) from project_proposal_checkings c2 group by c2.project_proposal_id
      ) and c.last_action='forwarded' and ${filterCondition}`;

      const queryForCount = `
      from project_proposal_checkings c
      left join project_proposals b on c.project_proposal_id = b.id 
      where c.at_role_id in (
        select authority_level from roles_in_order where name in (${roles.map(function (p) { return '\'' + p + '\''; }).join(',')})
      ) and c.id in (
        select max(id) from project_proposal_checkings c2 group by c2.project_proposal_id
      ) and c.last_action='forwarded' and ${filterCondition}
      `

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const grouping = "group by b.id, um.ulb_name, pt.name";

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type, ARRAY_AGG(uwm.ward_name::text) as ward_name ${queryWithoutFieldsAndPagination} 
      ${grouping} order by b.id ${ordering}
      limit ${limit} offset ${offset};`;



      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe<[]>(query),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
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

        if (ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  }



  getFullyApproved = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    roles: string[]
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      // console.log(level);

      let filterCondition = `b.ulb_id = ${ulbId}`;


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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
          filterCondition += ` and ulb_name in (${joinStringValues(ulb_name_filters)})`;
          ulb_name_filters_is_string = false;
        }
      }

      const queryWithoutFieldsAndPagination = `from project_proposal_checkings c 
      left join project_proposals b on c.project_proposal_id = b.id 
      left join ulb_masters um on b.ulb_id = um.id
      left join project_types pt on b.type_id = pt.id 
      left join project_propo_ward_maps as ppwm on ppwm.project_proposal_id = b.id
      left join ulb_ward_masters uwm on uwm.id = ppwm.ward_id
      
      
      where b.fully_approved=true and ${filterCondition}`;

      const queryForCount = `
      from project_proposals b 
      where b.fully_approved=true and ${filterCondition}
      `

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const grouping = "group by b.id, um.ulb_name, pt.name";

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type, ARRAY_AGG(uwm.ward_name::text) as ward_name ${queryWithoutFieldsAndPagination} 
      ${grouping} order by b.id ${ordering}
      limit ${limit} offset ${offset};`;



      // fetch the data
      prisma.$transaction([
        prisma.$queryRawUnsafe<[]>(query),
        prisma.$queryRawUnsafe<[CountQueryResult]>(`select count(*) ${queryForCount}`),
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

        if (ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  }


  getReturnedProposals = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    roles: string[]
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      // console.log(level);


      let filterCondition = `b.ulb_id = ${ulbId}`;


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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
          filterCondition += ` and ulb_name in (${joinStringValues(ulb_name_filters)})`;
          ulb_name_filters_is_string = false;
        }
      }

      const queryWithoutFieldsAndPagination = `from project_proposal_checkings c 
      left join project_proposals b on c.project_proposal_id = b.id 
      left join ulb_masters um on b.ulb_id = um.id
      left join project_types pt on b.type_id = pt.id
      
      
      where c.at_role_id in (
        select authority_level from roles_in_order where name in (${roles.map(function (p) { return '\'' + p + '\''; }).join(',')})
      ) and c.id in (
        select max(id) from project_proposal_checkings c2 group by c2.project_proposal_id
      ) and c.last_action='sent_back' and ${filterCondition}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type ${queryWithoutFieldsAndPagination} 
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

        if (ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  }


  getOutbox = async (
    filters: any,
    ulbId: number,
    page: number,
    limit: number,
    order: number,
    roles: string[]
  ): Promise<any> => {

    /*
    get the role names of the current person
    get the checklist for the current project
    get the role names of the persons after the current person
    get the role ids of the persons next to the 


    get the (project proposals joined with last checkings record) for which the role_id is greater
    */

    return new Promise((resolve, reject) => {
      // console.log(level);


      let filterCondition = `b.ulb_id = ${ulbId}`;


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
      if (ulb_name_filters) {
        if (typeof ulb_name_filters == 'string') {
          filterCondition += ` and ulb_name ilike '%${ulb_name_filters}%'`;
        } else {
          filterCondition += ` and ulb_name in (${joinStringValues(ulb_name_filters)})`;
          ulb_name_filters_is_string = false;
        }
      }

      const queryWithoutFieldsAndPagination = `from project_proposal_checkings c 
      left join project_proposals b on c.project_proposal_id = b.id 
      left join ulb_masters um on b.ulb_id = um.id
      left join project_types pt on b.type_id = pt.id 
      
      
      where b.fully_approved=false and c.at_role_id > (
        select max(authority_level) from roles_in_order where name in (${roles.map(function (p) { return '\'' + p + '\''; }).join(',')})
      ) and c.id in (
        select max(id) from project_proposal_checkings c2 group by c2.project_proposal_id
      ) and ${filterCondition}`;

      const ordering = order == -1 ? "desc" : "asc";

      const offset = (page - 1) * limit;

      const query = `select b.id, b.project_proposal_no, b.proposed_date, b.title, b.ulb_id, um.ulb_name, b.type_id, pt.name as type ${queryWithoutFieldsAndPagination} 
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

        if (ulb_name_filters_is_string)
          result['ulb_name'] = ulb_names;

        // console.log(result);
        resolve(result);
      }).catch((error) => {
        reject(error);
      });

    });

  }


  getReferenceDocList = async (proposalId: number) => {
    return await prisma.$queryRaw`
    select * from measurement_ref_docs where proposal_id=${proposalId}
    `;
  }

}

export default ProjectVerificationDao;
