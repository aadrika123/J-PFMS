import dotenv from "dotenv";
// import app from "./app";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "../src/apis/docs/swagger"; // Import your Swagger documentation specification
// import { number } from "joi";
// import { string } from "joi";
// import PreparedEstimatedRoute from "./apis/prepared-estimated/PreparedEstimatedRoute";

// const app = express();
// const PORT = process.env.PORT || 5000;
dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Mount Swagger UI middleware
// app.use("/api/prepared-estimated", PreparedEstimatedRoute); // Mount prepared-estimated route
const PORT = process.env.PORT;
// .....................................
interface DataType {
  barData: number[];
  lineData: number[];
  labels: string[];
}

interface Data {
  Annually: DataType;
  Monthly: DataType;
  Quarterly: DataType;
}

// Dummy data for the example
const data: Data = {
  Annually: {
    barData: [420, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    lineData: [203, 402, 305, 270, 430, 220, 170, 310, 500, 220, 120, 160],
    labels: [
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
    ],
  },
  Monthly: {
    barData: [5120, 1505, 4104, 6701, 2027, 4013, 2001, 3502, 7502, 3200, 2507, 1600],
    lineData: [2003, 402, 3005, 2070, 4030, 2020, 1070, 2010, 5000, 2020, 1020, 1060],
    labels: [
      "Jan 2023",
      "Feb 2023",
      "Mar 2023",
      "Apr 2023",
      "May 2023",
      "Jun 2023",
      "Jul 2023",
      "Aug 2023",
      "Sep 2023",
      "Oct 2023",
      "Nov 2023",
      "Dec 2023",
    ],
  },
  Quarterly: {
    barData: [100, 200, 150, 250],
    lineData: [10, 20, 15, 25],
    labels: ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"],
  },
};

app.get("/data", (req, res) => {
  const period = req.query.period as keyof Data;
  const responseData = data[period];
  if (responseData) {
    res.json(responseData);
  } else {
    res.status(404).send("Data not found for the specified period");
  }
});
// ............................
app.get("/data1", (req: Request, res: Response) => {
  // Dummy data
  const data = { value: 76 };
  res.json(data);
});
// .....................
const q1Data = [44000, 55000, 41000, 67000, 22000];
const q2Data = [20000, 40000, 25000, 10000, 12000];

// Endpoint to fetch Q1 data
app.get('/api/q1-data', (req, res) => {
  res.json(q1Data);
});

// Endpoint to fetch Q2 data
app.get('/api/q2-data', (req, res) => {
  res.json(q2Data);
});
// .....................
if (PORT) {
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
} else {
  console.log("Server PORT not specified ...");
}
export default app;
