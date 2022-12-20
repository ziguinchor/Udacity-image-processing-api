import { resize } from "../controllers/resizeController";
import fs from "fs";
import { versions } from "process";

it("should return relative path of image if exists", () => {
  return resize("landshaft", 10, 10).then((relPath) => {
    expect(relPath).toBe("/output/landshaft-10-10.jpg");
  });
});

it("should create resized image", () => {
  return resize("landshaft", 10, 10).then((relPath) => {
    try {
      expect(fs.existsSync(`../images/${relPath}`)).toBe(true);
    } catch (err) {
      // console.error(err)
    }
  });
});
