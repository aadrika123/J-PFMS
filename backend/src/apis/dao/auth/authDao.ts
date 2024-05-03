import { PrismaClient } from "@prisma/client";
// import { generateRes } from "../../../util/generateRes";
import Middleware from "../../middleware/middleware";
import nodemailer from "nodemailer";
import { generateOtp } from "../../../util/helper/generateOtp";
// import bcrypt from "bcrypt";


const prisma = new PrismaClient();

class AuthDao {
  private middleware: Middleware;
  constructor() {
    this.middleware = new Middleware();
  }

  login = async (credentials: any) => {
    console.log(credentials)
    // const { password, email } = credentials;
    // const employee = await prisma.users.findFirst({
    //   where: { email },
    //   select: {
    //     id: true,
    //     user_id: true,
    //     name: true,
    //     email: true,
    //     password: true,
    //     designation: {
    //       select: {
    //         id: true,
    //         name: true,
    //         udhd:{
    //           select: {
    //             id: true,
    //             name: true
    //           }
    //         }
    //       }
    //     }
    //   },
    // });

    // if (!employee) {
    //   return generateRes(employee);
    // }
    // const isValidPassword: boolean = await bcrypt.compare(password, employee.password);
    // if (isValidPassword) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { password, ...others } = employee;
    //   const token = this.middleware.jwtSign(others);

    //   return generateRes({ ...others, token });
    // }
    return false;
  };

  ////// Sending OPT on mail ///////////
  sendMailOtp = async (email: string) => {
    const otp = generateOtp();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verification",
      text: `Your otp is ${otp}`,
    };

    transporter.sendMail(mailOptions).then(async () => {
      await prisma.otps.create({
        data: {
          email,
          otp,
        },
      });
    });
  };

  ////////////// Verify Mail Otp
  verifyMailOtp = async (email: string, otp: number) => {
    const data = await prisma.otps.findFirst({
      where: {
        email,
        otp,
      },
    });

    if (data && data?.created_at) {
      const createdAt: Date = new Date(data.created_at);

      const currentTime: Date = new Date();

      const timeDifference: number =
        currentTime.getTime() - createdAt.getTime();

      await prisma.otps.deleteMany({
        where: {
          email: data.email,
        },
      });

      return timeDifference <= (Number(process.env.OTP_EXPIRY_TIME) || 120000)
        ? true
        : false;
    }
    return null;
  };
}

export default AuthDao;
