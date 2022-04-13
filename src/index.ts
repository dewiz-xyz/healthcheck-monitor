import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import { bodyParserErrorHandler } from "./errorHandler";
import healthCheck from "./healthcheck";
import runCronJobs from "./cron-jobs";

const app: Application = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParserErrorHandler());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "OK", env: JSON.stringify(process.env) });
});

app.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  try {
    res.json({ healthy: await healthCheck(body) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});

process.on("uncaughtException", function (err: Error) {
 console.error(err);
})

// Run cron jobs
runCronJobs();

