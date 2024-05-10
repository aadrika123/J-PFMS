import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

type CriteriaType = {
  state?: number;
  district?: number;
};

class UlbDao {
  removeDuplicates(data: any[]) {
    // Create a map to store unique 'name' values
    const uniqueNames = new Map();

    // Iterate over the array and add entries to the map
    data.forEach((item) => {
      uniqueNames.set(item.name, item);
    });

    // Convert the map values back to an array
    const uniqueData = Array.from(uniqueNames.values());

    return uniqueData;
  }

  ///// Get All ULBs
  async getUlbs() {
    const data = await prisma.$queryRaw`
        select id::int, ulb_name as name
        from ulb_masters 
        order by name asc
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
    order by name asc
    `);

    return generateRes(data);
  }

  async getUlbsByDistrict(districtId: number) {
    const data = await prisma.$queryRaw`
    select id::int, ulb_name as name
    from ulb_masters
    where district_id = ${districtId}
    order by name asc
    `;

    return generateRes(data);
  }

  ////// Get Wards on the basis of ulb
  async getWardsByUlb(ulbId: number) {
    const data: any = await prisma.$queryRaw`
    select id::int, ward_name as name
    from ulb_ward_masters
    where ulb_id = ${ulbId} and status = 1
    order by name asc
    `;
    const updatedData = this.removeDuplicates(data);
    return generateRes(updatedData);
  }
}

export default UlbDao;
