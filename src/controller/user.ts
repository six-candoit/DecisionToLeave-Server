import { Request, Response } from "express";
import { validationResult } from "express-validator";

// Service
import { reportService, userService } from "../service";

// DTO
import { IUserDTO } from "../interface/IUser";

// Library
import { rm, sc } from "../constants";
import { fail, success } from "./../constants/response";

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const user = await userService.getUser(+userId);

  // get report
  const activeReports = await reportService.getActiveReport(userId);

  let total = 100;
  let currentName = null;

  await Promise.all(
    activeReports.map(async (activeReport) => {
      total += activeReport.point;

      if (!currentName) currentName = activeReport.ex_name;
    })
  );
  const data = {
    userId,
    name: user.nickname,
    percent: total,
    currentName,
  };

  return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
};

const user = {
  getUser,
};

export default user;
