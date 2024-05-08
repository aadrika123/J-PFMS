import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class DistrictDao {
  ///// Get All districts
  async get() {
    const data = await prisma.$queryRaw`
        select id::int, district_name as name
        from district_masters 
        `;

    return generateRes(data);
  }

  ////// Get districts on the basis of district, state
  async getDistrictsByState(stateId: number) {

    const data = await prisma.$queryRaw`
    select id::int, district_name as name
    from district_masters
    where state_id = ${stateId}
    `;

    return generateRes(data);
  }
}

export default DistrictDao;
