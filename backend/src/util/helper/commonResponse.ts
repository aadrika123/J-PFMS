import { Request, Response } from "express";
import { sendResponse } from "../sendResponse";
import { resObj } from "../types";

const CommonRes = Object.freeze({
  VALIDATION_ERROR: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  SERVER_ERROR: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response,
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  CREATED: (
    message: any,
    data: unknown,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  SUCCESS: (
    message: any,
    data: unknown,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      true,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  NOT_FOUND: (
    message: any,
    data: unknown,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      false,
      message,
      data,
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  UNAUTHORISED: (
    error: any,
    resObj: resObj,
    req: Request,
    res: Response
  ): Promise<Response> => {
    return sendResponse(
      false,
      error,
      "",
      200,
      resObj.action,
      resObj.apiId,
      resObj.version,
      req,
      res
    );
  },
  DEFAULT: "The underlying {kind} for model {model} does not exist.",
});

export default CommonRes;
