import { resize } from "../controllers/resizeController";

it("should return relative path of image if exists", () => {
  return resize("landshaft", 10, 10).then((relPath) => {
    expect(relPath).toBe("/output/landshaft-10-10.jpg");
  });
});
