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

  if (!name) {
    return res.status(400).send("No image file name provided!");
  }

  const n: string = (name as string).toLowerCase();
  const w: number = parseInt(width as string, 10) as number;
  const h: number = parseInt(height as string, 10) as number;

  if (!imageExists(n)) {
    return res.status(404).render("not-found");
  }

  if (w <= 0 || h <= 0)
    res
      .status(400)
      .send("Please Provide a correct values for height and width.");
  
  

  const cached = getCachedOrFail(n, w, h);
  if (cached) {
    return res.render("image", { image: cached });
  }

  const resized: string = path.resolve(await resize(n, w, h));
  res.render("image", { image: resized });
});

export default imageProcRouter;
