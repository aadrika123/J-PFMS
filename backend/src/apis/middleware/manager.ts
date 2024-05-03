"use strict";

import { NextFunction, Request, Response } from "express";
import CommonRes from "../../util/helper/commonResponse";
import { resMessage } from "../responseMessage/commonMessage";
import { resObj } from "../../util/types";
import { RoleCheckResult, checkProjectManager } from "../roles/roles";

  //// Verify Is Manager or not Through masterDB
  export const manager =  async (
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