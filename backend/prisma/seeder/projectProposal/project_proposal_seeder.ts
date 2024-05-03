import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const project_proposal_seeder = async () => {
  const number_of_records = 20;
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      ulb_id: 1,
      project_proposal_no: "BN-" + `${i}`.padStart(5, "0"),
      project_proposal_date: faker.date.recent(),
      particulars: faker.person.jobArea(),
      sanction_date: faker.date.past(),
      outstanding_balance: 12.0,
      sanctioned_amount: 15.0,
      amount: 10.0,
      remarks: faker.finance.transactionDescription(),
    };
    await prisma.project_proposals.create({ data: record });
  }
};
export default project_proposal_seeder;
