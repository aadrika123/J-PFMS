import express from "express";
import cors from "cors";
import {
  resourcesUsage,
  responseTime,
} from "./apis/middleware/responseTime";
import ViizzDevApis from "./apis/viizz_dev_apis";
import PFMSRoute from "./router";

const app = express();
app.use("/public/", express.static('public'));
app.use(express.json());
app.use(cors());
// { origin: "http://localhost:5000" }
app.use(responseTime);
app.use(resourcesUsage);

/// JUIDCO_PFMS ///
new PFMSRoute(app);

(new ViizzDevApis(app, 500, 600)).register();


export default app;
