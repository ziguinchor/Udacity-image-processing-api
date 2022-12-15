import { existsSync } from "fs";
import { Router, Request, Response } from "express";
import { fstat } from "fs";

const imageProcRouter = Router();

const imgExts = ["jpg", "jpeg", "png", "gif"];

function imageExists(fileName: string): Boolean {
  const imgPath = `${__dirname}/../images/raw/${fileName}`;
  return existsSync(imgPath);
}

function getCachedOrFail(name: string, h: number, w: number): Boolean | string {
  const fileName = [name, h, w].join("-");

  imgExts.forEach((ext: string) => {
    const resolved: string = `${__dirname}/../images/output/${fileName}.${ext}`;
    if (existsSync(resolved)) {
      return resolved;
    }
    return false;
  });
  return false;
}

imageProcRouter.get("/", (req: Request, res: Response) => {
  console.log(req.query);
  let { width, height, name } = req.query;
  const w: number = parseInt(width as string, 10) as number;
  const h: number = parseInt(height as string, 10) as number;

  if (!imageExists(name as string)) {
    res.render("not-found");
  }

  const cached = getCachedOrFail(name as string, w, h);
  if (cached) {
    res.sendFile(cached as string);
  }

  res.end("");
  // resize(name).pipe(res);
});

export default imageProcRouter;
