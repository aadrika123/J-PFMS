import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const project_type_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////

  const records: string[] = ["Road Cunstruction", "Building Cunstruction", "Strit Light", "Sewage Cunstruction"];

  for (const item of records) {
    await prisma.project_types.create({
      data: {
        name: item,
      },
    });
  }
};

export default project_type_seeder;
