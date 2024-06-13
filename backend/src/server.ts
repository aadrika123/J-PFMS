import dotenv from "dotenv";
import app from "./app";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "../src/apis/docs/swagger"; // Import your Swagger documentation specification
// import PreparedEstimatedRoute from "./apis/prepared-estimated/PreparedEstimatedRoute";

// const app = express();
// const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Mount Swagger UI middleware
// app.use("/api/prepared-estimated", PreparedEstimatedRoute); // Mount prepared-estimated route
const PORT = process.env.PORT;
if (PORT) {
  app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
  });
} else {
  console.log("Server PORT not specified ...");
}
export default app;
