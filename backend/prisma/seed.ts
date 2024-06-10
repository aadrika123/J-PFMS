import { PrismaClient } from "@prisma/client";
// import bill_payment_entry_seed from "./seeder/bill_payment_entry_seed";
import foreign_wrapper from "./seeder/foreign_wrapper";
import project_proposal_seeder from "./seeder/projectProposal/project_proposal_seeder";
import project_proposal_stages_seeder from "./seeder/projectProposal/project_proposal_stages_seeder";
import doc_type_seeder from "./seeder/masters/doc_type_seeder";
import project_type_seeder from "./seeder/masters/project_type_seeder";

import readXlsxFile from "read-excel-file/node";
import bank_seeder from "./seeder/masters/bank_seeder";

const prisma = new PrismaClient();


const sorSeeder = async () => {
  console.log("sorSeeder");
  const file_path = "./prisma/data/pfms/SOR Table Structure.xlsx";

  readXlsxFile(file_path).then(async (rows) => {
    const n = rows.length;
    for (let i = 1; i < n; i++) {
      const row = rows[i];
      
      
      if(row[0] == null || row[0].toString().trim().length == 0 )
        continue;

      console.log(row);

      await prisma.schedule_of_rates.create({
        data: {
            sno: row[0].toString(),
            description: row[1].toString(),
            activity: row[2] ? row[2].toString(): "",
            output_of_machine: row[3] ? row[3].toString(): "",
            output: row[4] ? row[4].toString() : "",
            basic_rate: row[5] ? Number(row[5].toString()): null,
            da: row[6] ? Number(row[6].toString()) : null,
            unit: row[7].toString(),
            rate: Number(row[8].toString()),
            description_type: row[9].toString(),
        },
      });

    }
  });


}


const independentSeeds = async () => {
  await sorSeeder();
}


async function main() {

  await independentSeeds();

  // await prisma.$queryRaw`DROP TABLE users cascade`;
  // await prisma.$queryRaw`DROP TABLE wf_roles cascade`;
  // await prisma.$queryRaw`DROP TABLE wf_roleusermaps cascade`;
  await project_type_seeder();
  setTimeout(async () => {
    await project_proposal_seeder();

    await project_proposal_stages_seeder();

    await doc_type_seeder();

    await bank_seeder();
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
