import sharp from "sharp";
import fs from "fs";

module.exports = function resize(
  path: string,
  format: string,
  width: number,
  height: number
) {
  const readStream = fs.createReadStream(path);
  return readStream;
};
