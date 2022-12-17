import fs, { existsSync } from "fs";
import sharp from "sharp";
import { Stream } from "stream";
import * as StreamPromises from "stream/promises";

const imgExts = ["jpg", "jpeg", "png", "gif"];

export function imageExists(fileName: string): Boolean {
  const imgPath = `${__dirname}/../images/raw/${fileName}.jpg`;
  return existsSync(imgPath);
}

export function getCachedOrFail(
  name: string,
  w: number,
  h: number
): Boolean | string {
  const fileName = [name, w, h].join("-");
  const resolved: string = `${__dirname}/../images/output/${fileName}.jpg`;
  if (existsSync(resolved)) {
    return `/output/${fileName}.jpg`;
  }
  return false;
}

export async function resize(
  fileName: string,
  width: number,
  height: number
): Promise<string> {
  const resolved = [fileName, width, height].join("-");

  const inputPath: string = `${__dirname}/../images/raw/${fileName}.jpg`;
  const outputPath: string = `${__dirname}/../images/output/${resolved}.jpg`;

  const readStream: fs.ReadStream = fs.createReadStream(inputPath);
  const writeStream: fs.WriteStream = fs.createWriteStream(outputPath);

  let resizeTransform: sharp.Sharp = sharp();

  resizeTransform = resizeTransform
    .toFormat("jpeg")
    .resize(width, height)
    .on("info", (_) => console.log("Resizing done!"));

  await StreamPromises.pipeline(readStream, resizeTransform, writeStream);
  const resizedRelPath = `/output/${resolved}.jpg`;
  return resizedRelPath;
}