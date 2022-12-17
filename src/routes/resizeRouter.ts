import { existsSync } from "fs";
import { Router, Request, Response } from "express";
import { fstat } from "fs";

import {
  getCachedOrFail,
  imageExists,
  resize,
} from "../controllers/resizeController";
import path from "path";

const imageProcRouter = Router();

imageProcRouter.get("/", async (req: Request, res: Response) => {
  let { width, height, name } = req.query;

  const n: string = (name as string).toLowerCase();
  const w: number = parseInt(width as string, 10) as number;
  const h: number = parseInt(height as string, 10) as number;

  if (!imageExists(n)) {
    return res.render("not-found");
  }

  const cached = getCachedOrFail(n, w, h);
  if (cached) {
    return res.render("image", { image: cached });
  }

  const resized: string = path.resolve(await resize(n, w, h));
  res.render("image", { image: resized });
});

export default imageProcRouter;
