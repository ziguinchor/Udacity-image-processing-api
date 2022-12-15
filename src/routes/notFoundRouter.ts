import { Router, Response } from "express";

const notFoundRouter = Router();

notFoundRouter.get("/", (_, res: Response) => {
  res.render("not-found");
});

export default notFoundRouter;
