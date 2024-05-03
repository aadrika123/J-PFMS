import { Request, Response } from "express";
import { resObj } from "../../util/types";
import { Prisma, PrismaClient, audit_trails } from "@prisma/client";
import { warnlogger } from "../../../loggerConfig";
import CommonRes from "../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";

const prisma = new PrismaClient();

class AuditTrail {
  constructor() {
    //
  }

  store = async (error: any, resObj: resObj, req: Request, res: Response) => {
    const totalTime = process.hrtime(res.locals.startTime);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { auth, ...others } = req.body;
      await prisma.audit_trails.create({
        data: {
          error: String(error),
          message: error.message,
          meta_data: {
            ...resObj,
            responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6,
          },
          user: {
            user: auth,
          },

          payload: {
            body: { ...others },
            params: { ...req?.params },
            headers: { ...req?.headers },
          },
          ram_usage: res.locals.memoInfo || 0.0,
          request_no: 0,
          db_connection_no: 0,
          cpu_usage: res.locals.cpuInfo || 0.0,
        },
      });
    } catch (error: any) {
      warnlogger.warn({
        metaData: {
          ...resObj,
          responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6,
        },
        error,
        message: error.message,
      });
    }
  };

  //// Get audit
  get = async (req: Request, res: Response, apiId: string) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    const limit: number = Number(req.query.limit);
    const page: number = Number(req.query.page);
    const date: any = String(req.query.date);
    try {
      const query: Prisma.audit_trailsFindManyArgs = {
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          created_at: 'desc'
        }
      };

      if (date !== "undefined" && date !== "") {
        query.where = {
          created_at: {
            gte: new Date(date),
            lte: new Date(`${date}T23:59:59`),
          },
        };
      }

      const data = await prisma.audit_trails.findMany(query);

      return CommonRes.SUCCESS(
        resMessage("Audit Trails").FOUND,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };

  ////// Get for previous months
  getPreviousMonthsData = async (
    req: Request,
    res: Response,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId,
      action: "GET",
      version: "1.0",
    };
    try {
      const data = await prisma.$queryRaw<audit_trails[]>`SELECT 
      TRIM(TO_CHAR(created_at, 'Month')) AS month, EXTRACT(MONTH FROM created_at) as numMonth, 
      cast(count(*) as INTEGER) AS total_logs
        FROM 
      audit_trails
      WHERE 
      created_at >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY 
      month, numMonth
      ORDER BY 
      numMonth`;

      return CommonRes.SUCCESS(
        resMessage("Audit Trails").FOUND,
        data,
        resObj,
        req,
        res
      );
    } catch (error: any) {
      return CommonRes.SERVER_ERROR(error, resObj, req, res);
    }
  };
}

export default AuditTrail;
