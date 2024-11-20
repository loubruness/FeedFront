import express, { Express, Request, Response, Application } from "express";

const app: Application = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Mock Efrei API");
});

app.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}/`);
});
