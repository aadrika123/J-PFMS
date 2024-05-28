import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const project_proposal_seeder = async () => {
  const number_of_records = 20;
  const date = new Date();
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      ulb_id: 2,
      project_proposal_no: "PPN-2024" + `${String(date.getMonth()+1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${i}`.padEnd(6, "0"),
      proposed_by: faker.person.fullName(),
      type_id: 1,
      proposed_date: faker.date.recent(),
      title: faker.lorem.words(4),
      description: faker.lorem.lines(1),
      state_id: 16,
      district_id: 20,
      ward_id: 31,
      // wards: "{31}",
      user_id: 172,
      pin_code: 234565,
      execution_body: 1,
      address: faker.address.city()
    };
    await prisma.project_proposals.create({ data: record });
  }
};
export default project_proposal_seeder;
