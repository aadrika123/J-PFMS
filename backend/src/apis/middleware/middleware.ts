"use strict";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CommonRes from "../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";
import { resObj } from "../../util/types";
import { RoleCheckResult, checkProjectManager } from "../roles/roles";

class Middleware {
  private initMsg;
  constructor() {
    this.initMsg = "Token";
  }

  //// Generate the temperaury token
  jwtSign = (authData: any) => {
    const secret = process.env.SECRET_KEY || "xyz";

    return jwt.sign(
      {
        authData,
      },
      secret,
      { expiresIn: "1d" }
    );
  };

  //// Verify the generated token
  publicValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resObj: resObj = {
      apiId: "Not related to APIs",
      action: "Token Verification",
      version: "1.0",
    };
    const secret = process.env.SECRET_KEY || "xyz";
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];
    if (token && typeof token !== "undefined") {
      try {
        const data: any = await jwt.verify(token, secret);

        res.locals.user = data?.authData;
        next();
      } catch (error: any) {
        return CommonRes.UNAUTHORISED(
          resMessage(this.initMsg).INVALID,
          resObj,
          req,
          res
        );
      }
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        req,
        res
      );
    }
  };

  //// Verify Is Accountent or not
  accountant = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId: apiId || "Not related to APIs",
      action: "Authentication",
      version: "1.0",
    };
    const secret = process.env.SECRET_KEY || "xyz";
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];
    if (token && typeof token !== "undefined") {
      try {
        const data: any = await jwt.verify(token, secret);
        res.locals.user = data?.authData;
        if (
          data &&
          data?.authData?.designation?.name !==
            "Accounts Department – Accountant"
        ) {
          return CommonRes.UNAUTHORISED(
            "You are not authorised for the route",
            resObj,
            req,
            res
          );
        }
        next();
      } catch (error: any) {
        return CommonRes.UNAUTHORISED(
          resMessage(this.initMsg).INVALID,
          resObj,
          req,
          res
        );
      }
    } else {
      return CommonRes.UNAUTHORISED(
        resMessage(this.initMsg).NOT_FOUND,
        resObj,
        req,
        res
      );
    }
  };

  //// Verify Is Manager or not Through masterDB
  manager = async (
    req: Request,
    res: Response,
    next: NextFunction,
    apiId: string
  ) => {
    const resObj: resObj = {
      apiId: apiId || "Not related to APIs",
      action: "Authentication",
      version: "1.0",
    };

    const roleCheckResult = checkProjectManager(req.body.data.auth);


    
    if (roleCheckResult == RoleCheckResult.NO) {
      return CommonRes.UNAUTHORISED(
        "You are not authorised for the route",
        resObj,
        req,
        res
      );
    }else if(roleCheckResult == RoleCheckResult.YES){
      next();
    }else {
      return CommonRes.UNAUTHORISED(
        resMessage("Role").NOT_FOUND,
        resObj,
        req,
        res
      );
    }
  };
}

export default Middleware;
