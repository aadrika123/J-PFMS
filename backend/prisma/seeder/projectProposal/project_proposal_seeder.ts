import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const project_proposal_seeder = async () => {
  const number_of_records = 20;
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      ulb_id: 2,
      project_proposal_no: "PN-" + `${i}`.padStart(5, "0"),
      date: faker.date.recent(),
      summary: faker.lorem.lines(1),
      description: faker.lorem.lines(1),
      state_id: 16,
      district_id: 20,
      ward_id: 31,
      user_id: 172,
      pin_code: 234565,
      execution_body: 1,
      address: faker.address.city()
    };
    await prisma.project_proposals.create({ data: record });
  }
};
export default project_proposal_seeder;
