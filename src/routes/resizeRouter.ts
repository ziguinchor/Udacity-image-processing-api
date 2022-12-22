import { existsSync } from "fs";
import { Router, Request, Response } from "express";
import { fstat } from "fs";

import {
  getCachedOrFail,
  imageExists,
  resize,
} from "../controllers/resizeController";
import path from "path";

const router = Router();

interface dto {
  name: string;
  height: string;
  width: string;
}

router.get("/", async (req: Request, res: Response) => {
  function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  let { width, height, name } = req.query as unknown as dto;

  if (!name) {
    return res.status(400).send("No image file name provided!");
  }

  if (!height || !width) {
    return res.status(400).send("Please provide correct height/width value !");
  }

  console.log(typeof +width !== "number", width, +width);
  if (!isNumeric(height) || !isNumeric(width) || +width <= 0 || +height <= 0)
    return res
      .status(400)
      .send("Please Provide a correct values for height and width.");

  const n: string = (name as string).toLowerCase();
  const w: number = +width;
  const h: number = +height;

  if (!imageExists(n)) {
    return res.status(404).render("not-found");
  }

  const cached = getCachedOrFail(n, w, h);
  if (cached) {
    return res.render("image", { image: cached });
  }

  const resized: string = path.resolve(await resize(n, w, h));
  res.render("image", { image: resized });
});

export default router;
