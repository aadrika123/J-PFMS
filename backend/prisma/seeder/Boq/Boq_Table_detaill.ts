import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    itemNo: "L-07",
    description: "Diver",
    unit: "Day",
    bidrate: 232.16,
    descriptionType: "Labour",
  },
  {
    itemNo: "L-13",
    description: "Mazdoor",
    unit: "Day",
    bidrate: 221.61,
    descriptionType: "Labour",
  },
  {
    itemNo: "L-12",
    description: "Mate / Supervisor",
    unit: "Day",
    bidrate: 232.16,
    descriptionType: "Labour",
  },
  {
    itemNo: "M-001",
    description: "Stone Boulder of size 150 mm and below at Quarry",
    unit: "cum",
    bidrate: 573.15,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-002",
    description:
      "Supply of quarried stone 150 - 200 mm size for Hand Broken at Quarry",
    unit: "cum",
    bidrate: 598.32,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-006",
    description: "Fine sand at Quarry",
    unit: "cum",
    bidrate: 120.42,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-052",
    description: "Aggregates 13.2/12.5 mm nominal size at Quarry",
    unit: "cum",
    bidrate: 827.86,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-056",
    description: "AC pipe 100 mm dia",
    unit: "metre",
    bidrate: 50.28,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-057",
    description: "Acrylic polymer bonding coat",
    unit: "litre",
    bidrate: 129.48,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-060",
    description: "Aluminium alloy/galvanised steel",
    unit: "tonne",
    bidrate: 46239.26,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-065",
    description: "Bearing (Cast steel rocker bearing assembly of 250 tonne )",
    unit: "nos",
    bidrate: 55883.28,
    descriptionType: "Materials",
  },
  {
    itemNo: "M-072",
    description: "Binding wire",
    unit: "kg",
    bidrate: 62.52,
    descriptionType: "Materials",
  },
  {
    itemNo: "P&M-001",
    description: "Air Compressor",
    unit: "hour",
    bidrate: 293.76,
    descriptionType: "Plant and Machinery",
  },
  {
    itemNo: "P&M-002",
    description: "Batching and Mixing Plant (a) 30 cum capacity",
    unit: "hour",
    bidrate: 2598,
    descriptionType: "Plant and Machinery",
  },
  {
    itemNo: "P&M-063",
    description:
      "Air compressor with pneumatic chisel attachment for cutting hard clay",
    unit: "hour",
    bidrate: 513,
    descriptionType: "Plant and Machinery",
  },
  {
    itemNo: "P&M-079",
    description: "Generator 33 KVA",
    unit: "hour",
    bidrate: 342.36,
    descriptionType: "Plant and Machinery",
  },
  {
    itemNo: "P&M-058",
    description: "Truck 5.5 cum per 10 tonnes",
    unit: "tonne.km",
    bidrate: 2.268,
    descriptionType: "Plant and Machinery",
  },
];

async function Boq_Table_detail() {
  for (const item of data) {
    await prisma.boq.create({
      data: item,
    });
  }
}

export default Boq_Table_detail;
