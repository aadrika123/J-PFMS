import { PrismaClient } from "@prisma/client";
// import bill_payment_entry_seed from "./seeder/bill_payment_entry_seed";
import foreign_wrapper from "./seeder/foreign_wrapper";
import project_proposal_seeder from "./seeder/projectProposal/project_proposal_seeder";
import project_proposal_stages_seeder from "./seeder/projectProposal/project_proposal_stages_seeder";
import doc_type_seeder from "./seeder/masters/doc_type_seeder";

const prisma = new PrismaClient();

async function main() {
  
  // await prisma.$queryRaw`DROP TABLE users cascade`;
  // await prisma.$queryRaw`DROP TABLE wf_roles cascade`;
  // await prisma.$queryRaw`DROP TABLE wf_roleusermaps cascade`;

  setTimeout(async () => {

    await project_proposal_seeder();

    await project_proposal_stages_seeder();

    await doc_type_seeder();
  }, 8000);


  setTimeout(async () => {
    await foreign_wrapper();
  }, 9000);


}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1)
  });
