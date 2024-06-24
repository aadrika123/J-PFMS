import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export class ContractorManagementDao {

  getInboxData = async (proposalId: number) => {

    const records = [{
      id: 1,
      title: "Road repair project",
      quoted_amount: 12,
      tender_ref_no: "AFDSF32434234",
      commencement_date: "2024-02-10",
      completion_date: "2024-10-10",
      status: "not complete",
    },

    {
      id: 2,
      title: "Building construction project",
      quoted_amount: 12,
      tender_ref_no: "AFDSF32434234",
      commencement_date: "2024-02-10",
      completion_date: "2024-10-10",
      status: "not complete",
    }
    ];

    return {
        "count": 2,
        "totalPage": 1,
        "currentPage": 1,
        "records": records,
        "project_proposal_no": [],
        "ulb_name": []
    };
  }

  getFullDetails = async (proposalId: number) => {
    const data = {
      id: 2,
      title: "Building construction project",
      summary: "This is the project summary",
      description: "This is the project description",
      quoted_amount: 12,
      tender_ref_no: "AFDSF32434234",
      commencement_date: "2024-02-10",
      completion_date: "2024-10-10",
      status: "not complete",
    };

    return data;
  }

}
