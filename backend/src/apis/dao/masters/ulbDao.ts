import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

type CriteriaType = {
  state?: number;
  district?: number;
};

class UlbDao {
  ///// Get All ULBs
  async getUlbs() {
    const data = await prisma.$queryRaw`
        select id::int, ulb_name as name
        from ulb_masters 
        `;

    return generateRes(data);
  }

  ////// Get Ulbs on the basis of district, state
  async getFilteredUlbs(criteria: CriteriaType) {
    const { state, district } = criteria;

    let a = "";
    if (state) a += ` AND state_id = ${state}`;
    if (district) a += `AND district_id = ${district}`;

    const data = await prisma.$queryRawUnsafe(`
    select cast(id as integer), ulb_name as name
    from ulb_masters
    where true ${a}
    `);

    return generateRes(data);
  }

  async getUlbsByDistrict(districtId: number) {
    const data = await prisma.$queryRaw`
    select id::int, ulb_name as name
    from ulb_masters
    where district_id = ${districtId}
    `;

    return generateRes(data);
  }

  ////// Get Wards on the basis of ulb
  async getWardsByUlb(ulbId: number) {
    const data = await prisma.$queryRaw`
    select id::int, ward_name as name
    from ulb_ward_masters
    where ulb_id = ${ulbId}
    `;

    return generateRes(data);
  }
}

export default UlbDao;
