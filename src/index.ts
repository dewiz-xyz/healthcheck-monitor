import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

import { sendToDiscord } from './discord'
import { bodyParserErrorHandler } from './errorHandler'
import CheckFn from './healthcheck'
import { isCheckRequest } from './types'

const app: Application = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParserErrorHandler());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "OK" });
});

app.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  if (isCheckRequest(body)) {
    const healthy = await CheckFn[body.type](...body.params)
    if (!healthy && body.message) {
      await sendToDiscord(body.message);
    }
    res.json({ healthy });
  } else {
    res.status(400).json({ error: "Invalid request data" });
  }
})

app.listen(app.get("port"), () => {
  console.log(`Server on http://localhost:${app.get("port")}/`);
});

process.on('uncaughtException', function (err: Error) {
 console.error(err);
})

