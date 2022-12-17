import { Router, Response } from "express";

const notFoundRouter = Router();

notFoundRouter.get("/", (_, res: Response) => {
  res.status(404).render("not-found");
});

export default notFoundRouter;
