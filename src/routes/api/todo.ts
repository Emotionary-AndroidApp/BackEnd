import express from "express";

import validateRequest from "middleware/validate/validateRequest";
import apiNotFoundErrorHandler from "middleware/error/apiNotFoundErrorHandler";
import requireUserToken from "middleware/token/requireUserToken";

import getTodo, { getTodoQuery } from "controller/todo/getTodo";

const todoRouter = express.Router();

// 컨트롤러
todoRouter.get(
  "/",
  express.json(),
  requireUserToken,
  validateRequest({ query: getTodoQuery }),
  getTodo
);

// 404 핸들 미들웨어
todoRouter.use(apiNotFoundErrorHandler);

export default todoRouter;
