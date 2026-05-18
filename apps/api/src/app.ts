import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import { appRouter } from "./routes";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use("/api", appRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
