import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const project_type_seeder = async () => {

  const records: string[] = ["Road Construction", "Building Construction", "Strit Light", "Sewage Construction"];

  for (const item of records) {
    await prisma.project_types.create({
      data: {
        name: item,
      },
    });
  }
};

export default project_type_seeder;
