import {  PrismaClient, project_proposal_checkings, project_proposals } from "@prisma/client";

const prisma = new PrismaClient();




class ContractManagementDao {

  getInboxData = async (proposalId: number) => {
    return {
      proposalId
    }
  }


}

export default ContractManagementDao;
