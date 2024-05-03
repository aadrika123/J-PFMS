import { Request, Response, NextFunction } from "express";
import osu from "node-os-utils";

export const responseTime = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = process.hrtime();
  res.locals.startTime = startTime;
  next();
};

export const resourcesUsage = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mem = osu.mem;

  const data = await mem.info();
  res.locals.memoInfo = data.usedMemPercentage;

  /////////////////
  const cpu = osu.cpu;

  const info = await cpu.usage();
  res.locals.cpuInfo = info;
  next();
};
