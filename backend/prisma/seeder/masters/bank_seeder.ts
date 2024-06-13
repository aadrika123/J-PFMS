import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bank_seeder = async () => {

  const records: string[] = ["ICICI", "SBI", "UTI", "PNB"];

  for (const item of records) {
    await prisma.banks.create({
      data: {
        name: item,
      },
    });
  }
};

export default bank_seeder;
