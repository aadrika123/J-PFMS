import { PrismaClient } from "@prisma/client";
// import bill_payment_entry_seed from "./seeder/bill_payment_entry_seed";
import foreign_wrapper from "./seeder/foreign_wrapper";
import project_proposal_seeder from "./seeder/projectProposal/project_proposal_seeder";
import doc_type_seeder from "./seeder/masters/doc_type_seeder";
import project_type_seeder from "./seeder/masters/project_type_seeder";

import roles_in_order_seeder from "./seeder/project-verification/project_proposal_seeder";
import { sorSeeder } from "./seeder/project-verification/sor-seeder";
import bank_seeder from "./seeder/masters/bank_seeder";
import Boq_Table_detail from "./seeder/Boq/Boq_Table_detaill";

const prisma = new PrismaClient();


const independentSeeds = async () => {
  await sorSeeder();
  await roles_in_order_seeder();
}


async function main() {

  await independentSeeds();

  // await prisma.$queryRaw`DROP TABLE users cascade`;
  // await prisma.$queryRaw`DROP TABLE wf_roles cascade`;
  // await prisma.$queryRaw`DROP TABLE wf_roleusermaps cascade`;
  await project_type_seeder();
  setTimeout(async () => {
    await project_proposal_seeder();
    await doc_type_seeder();

    await bank_seeder();
  }, 8000);

  setTimeout(async () => {
    await foreign_wrapper();
  }, 9000);
  setTimeout(async () => {
    await Boq_Table_detail();
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
