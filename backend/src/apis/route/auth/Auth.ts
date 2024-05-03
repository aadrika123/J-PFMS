import express, { Request, Response } from "express";
import { baseUrl } from "../../../util/common";
import AuthController from "../../controller/auth/Login";

class AuthRoute {
  private authController: AuthController;
  constructor() {
    this.authController = new AuthController();
  }

  configure(app: express.Application, apiId: string) {
    app
      .route(`${baseUrl}/auth/login`)
      .post((req: Request, res: Response) =>
        this.authController.login(req, res, apiId + "01")
      );
    app
      .route(`${baseUrl}/auth/mail/send-otp`)
      .post((req: Request, res: Response) =>
        this.authController.sendMailOtp(req, res, apiId + "02")
      );
    app
      .route(`${baseUrl}/auth/mail/verify-otp`)
      .post((req: Request, res: Response) =>
        this.authController.verifyMailOtp(req, res, apiId + "03")
      );
  }
}

export default AuthRoute;
