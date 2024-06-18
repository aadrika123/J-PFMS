import { Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PreparedEstimatedDao {

  async get(req: Request): Promise<any> {
    const search: string = String(req.query.search);
    let data: any[] = [];
    if (search !== "" && typeof search === "string" && search !== "undefined") {
      data = await prisma.$queryRaw`
        SELECT description, unit, bidrate
        FROM public.boq WHERE description  ILIKE '%' || ${search} || '%'
        ORDER BY id ASC;
      `;
    } else {
      data = await prisma.$queryRaw`
        SELECT description, unit, bidrate
        FROM public.boq
        ORDER BY id ASC;
      `;
    }
    return data;
  }
   async getById(id: number): Promise<any> {
    return await prisma.boq.findUnique({ where: { id } });
  }

  async create(data: any): Promise<any> {
    return await prisma.boq.create({ data });
  }

  async update(id: number, data: any): Promise<any> {
    return await prisma.boq.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<any> {
    return await prisma.boq.delete({ where: { id } });
  }
}


export default PreparedEstimatedDao;
