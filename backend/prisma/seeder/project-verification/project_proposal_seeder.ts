import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const roles_in_order_seeder = async () => {



  const records : [string, number][] = [
    ["BACK OFFICE", 1],
    ["back office", 1],
    
    ["JUNIOR ENGINEER", 2],
    ["junior engineer", 2],
    
    ["ASSISTANT ENGINEER", 3],
    ["assistant engineer", 3],

    ["EXECUTIVE ENGINEER", 4],
    ["executive engineer", 4],

    ["SUPERINTENDENT ENGINEER", 5],
    ["superintendent engineer", 5],

    ["CHIEF ENGINEER", 6],
    ["chief engineer", 6],

    ["DEPUTY MUNICIPAL COMMISSIONER", 7],
    ["Deputy Municipal Commissioner", 7],

    ["ASSISTANT MUNICIPAL COMMISSIONER", 8],
    ["assistant municipal commissioner", 8],

    ["MUNICIPAL COMMISSIONER", 9],
    ["municipal commissioner", 9]

  ];

  for (let i = 0; i < records.length; i++) {
    await prisma.roles_in_order.create({ data: {
      name: records[i][0],
      authority_level: records[i][1]
    } });

  }
};
export default roles_in_order_seeder;
