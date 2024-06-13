import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";


const prisma = new PrismaClient();

export const sorSeeder = async () => {
    console.log("sorSeeder");
    const file_path = "./prisma/data/pfms/SOR Table Structure.xlsx";
  
    readXlsxFile(file_path).then(async (rows) => {
      const n = rows.length;
      for (let i = 1; i < n; i++) {
        const row = rows[i];
        
        
        if(row[0] == null || row[0].toString().trim().length == 0 )
          continue;
  
        console.log(row);
  
        await prisma.schedule_of_rates.create({
          data: {
              sno: row[0].toString(),
              description: row[1].toString(),
              activity: row[2] ? row[2].toString(): "",
              output_of_machine: row[3] ? row[3].toString(): "",
              output: row[4] ? row[4].toString() : "",
              basic_rate: row[5] ? Number(row[5].toString()): null,
              da: row[6] ? Number(row[6].toString()) : null,
              unit: row[7].toString(),
              rate: Number(row[8].toString()),
              description_type: row[9].toString(),
          },
        });
  
      }
    });
  }

  