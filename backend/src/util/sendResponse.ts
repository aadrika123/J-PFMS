import { Request, Response } from "express";
import errorCodes from "./errorCodes";
import { errLogger, infoLogger } from "../../loggerConfig";
import AuditTrail from "../apis/auditTrail/auditTrail";

/**
 * | Response Msg Version with apiMetaData
 */

export const sendResponse = async (
  status: boolean,
  message: any,
  resData: unknown,
  responseCode: number,
  action: string,
  apiId: string,
  version: string,
  req: Request,
  res: Response
): Promise<Response> => {

  
  if (!status) {
    resData = errorCodes[resData as keyof typeof errorCodes];
    errLogger.error({ metaData: { apiId, version, action }, message: message.message });
      new AuditTrail().store(message, { apiId, version, action }, req, res);
  } else {
    infoLogger.info({ metaData: { apiId, version, action }, data: resData });
  }

  if (message && message?.code && message?.meta?.cause) {
    // message = errorCodes[message?.code as keyof typeof errorCodes];
    message = message.meta.cause;
    responseCode = 400;
  } else {
    message = message?.message || message;
  }

  const totalTime = process.hrtime(res.locals.startTime);
  const jsonRes = {
    status,
    message,
    "meta-data": {
      apiId,
      version,
      responseTime: totalTime[0] * 1000 + totalTime[1] / 1e6,
      action,
    },
    data: resData,
  };

  return res.status(responseCode).json(jsonRes);
};
