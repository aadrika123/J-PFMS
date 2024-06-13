import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const doc_type_seeder = async () => {

  const records: string[] = ["aadhar", "letter"];

  for (const item of records) {
    await prisma.doc_types.create({
      data: {
        name: item,
      },
    });
  }
};

export default doc_type_seeder;
