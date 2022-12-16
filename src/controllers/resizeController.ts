import fs, { existsSync } from "fs";
import sharp from "sharp";
import { Stream } from "stream";

const imgExts = ["jpg", "jpeg", "png", "gif"];

export function imageExists(fileName: string): Boolean {
  const imgPath = `${__dirname}/../images/raw/${fileName}.jpg`;
  return existsSync(imgPath);
}

export function getCachedOrFail(
  name: string,
  h: number,
  w: number
): Boolean | string {
  const fileName = [name, w, h].join("-");

  const resolved: string = `${__dirname}/../images/output/${fileName}.jpg`;
  if (existsSync(resolved)) {
    return resolved;
  }
  return false;
}

export function resize(
  fileName: string,
  width: number,
  height: number
): string {
  const resolved = [fileName, width, height].join("-");

  const inputPath: string = `${__dirname}/../images/raw/${fileName}.jpg`;
  const outputPath: string = `${__dirname}/../images/output/${resolved}.jpg`;

  const readStream: fs.ReadStream = fs.createReadStream(inputPath);
  const writeStream: fs.WriteStream = fs.createWriteStream(outputPath);

  console.log(resolved);

  let resizeTransform: sharp.Sharp = sharp();

  resizeTransform = resizeTransform
    .toFormat("jpeg")
    .resize(width, height)
    .on("info", (_) => console.log("Resizing done!"));

  readStream.pipe(resizeTransform).pipe(writeStream);
  const resizedRelPath = `/output/${resolved}.jpg`;
  return resizedRelPath;
}
