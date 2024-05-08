import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class StateDao {
  ///// Get All states
  async get() {
    const data = await prisma.$queryRaw`
        select id::int, name
        from m_states 
        `;

    return generateRes(data);
  }

  async getJharkhand() {
    const data: any[] = await prisma.$queryRaw`
    select id::int, name from m_states
    where name = 'Jharkhand (JH)'
    `;

    return generateRes(data[0]);
  }
}

export default StateDao;
