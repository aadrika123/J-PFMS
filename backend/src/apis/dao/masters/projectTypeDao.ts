import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class ProjectTypeDao {
  ///// Get All states
  async get() {
    const data = await prisma.$queryRaw`
        select id::int, name
        from project_types 
        `;

    return generateRes(data);
  }
}

export default ProjectTypeDao;
