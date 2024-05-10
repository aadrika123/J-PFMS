import express from "express";
import FinanceRoute from "./router";
import cors from "cors";
import {
  resourcesUsage,
  responseTime,
} from "./apis/middleware/responseTime";
import ViizzDevApis from "./apis/viizz_dev_apis";

const app = express();
app.use("/public/", express.static('public'));
app.use(express.json());
app.use(cors());
// { origin: "http://localhost:5000" }
app.use(responseTime);
app.use(resourcesUsage);

/// JUIDCO_FINANCE ///
new FinanceRoute(app);

(new ViizzDevApis(app, 500, 600)).register();


export default app;
