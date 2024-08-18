import express from "express";
import multer from "multer";

import validateRequest from "middleware/validate/validateRequest";
import apiNotFoundErrorHandler from "middleware/error/apiNotFoundErrorHandler";
import requireUserToken from "middleware/token/requireUserToken";

import signup, { SignupRequestBody } from "controller/user/signup";
import checkId, { CheckIdRequestQuery } from "controller/user/checkId";
import checkName, { CheckNameRequestQuery } from "controller/user/checkName";
import getHome, { GetHomeRequestQuery } from "controller/user/getHome";
import getMy, { GetMyRequestQuery } from "controller/user/getMy";

const userRouter = express.Router();

// multer 객체 생성
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 1,
  },

  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(null, false);
  },
});

// 컨트롤러
userRouter.post(
  "/",
  upload.single("userProfile"),
  validateRequest({ body: SignupRequestBody }),
  signup
);
userRouter.get(
  "/check/id",
  express.json(),
  validateRequest({ query: CheckIdRequestQuery }),
  checkId
);
userRouter.get(
  "/check/name",
  express.json(),
  validateRequest({ query: CheckNameRequestQuery }),
  checkName
);
userRouter.get(
  "/home",
  express.json(),
  requireUserToken,
  validateRequest({ query: GetHomeRequestQuery }),
  getHome
);
userRouter.get(
  "/profile",
  express.json(),
  requireUserToken,
  validateRequest({ query: GetMyRequestQuery }),
  getMy
);

// 404 핸들 미들웨어
userRouter.use(apiNotFoundErrorHandler);

export default userRouter;
