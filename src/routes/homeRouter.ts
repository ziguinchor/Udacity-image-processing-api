import { Router, Response } from "express";

const homeRouter = Router();

homeRouter.get("/", (_, res: Response) => {
  res.render("index");
});

export default homeRouter;
