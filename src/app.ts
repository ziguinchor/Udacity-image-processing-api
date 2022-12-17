import path from "path";
import express, { Application } from "express";
import resizeRouter from "./routes/resizeRouter";
import homeRouter from "./routes/homeRouter";
import notFoundRouter from "./routes/notFoundRouter";
import { logger } from "./middleware/logger";
const app: Application = express();

app.use(logger);

app.use(express.json());
app.use("/output", express.static(path.join(__dirname, "images/output")));

app.set("views", path.resolve(__dirname, "views"));
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

app.use("/", homeRouter);
app.use("/resize", resizeRouter);
app.use("*", notFoundRouter);

export default app;
