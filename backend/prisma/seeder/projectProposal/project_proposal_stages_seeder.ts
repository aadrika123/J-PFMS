import { PrismaClient, project_proposal_stages } from "@prisma/client";
import { ProjectProposalStages } from "../../../../pfmslib/build/standard/project_proposal_stages";

const prisma = new PrismaClient();

const bill_approval_stages_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////

  const records: project_proposal_stages[] = [];

  function formatString(inputString: string) {
    return inputString.replace(/([A-Z])/g, ' $1').trim();
}

  Object.keys(ProjectProposalStages).forEach((item) => {
    records.push({
      id: Number(ProjectProposalStages[item as keyof typeof ProjectProposalStages]),
      name: formatString(item)
    });
  });

  for (const item of records) {
    await prisma.project_proposal_stages.create({
      data: {
        id: item.id, 
        name: item.name
      },
    });
  }
};

export default bill_approval_stages_seeder;


















// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const stages = [
//     {id: 1, name: "Level 1: Approved By Junior Engineer"},
//     {id: 2, name: "Level 2: Approved By Manager"},
// ];
// const bill_approval_stages_seeder = async () => {
//     console.log("Seeding bill approval stages.");

//     stages.forEach(async (stage) => {
//         await prisma.bill_approval_stages.create({data: stage});
//     });
// }

// export default bill_approval_stages_seeder;
