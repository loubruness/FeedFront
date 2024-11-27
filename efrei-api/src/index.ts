import express, { Application, Request, Response } from "express";

import courseRoutes from "./routes/course";
import studentRoutes from "./routes/student";
import userRoutes from "./routes/user";

const app: Application = express();
const port = 8000;

// Default route
app.get("/", (req: Request, res: Response) => {
  res.json({ name: "Mock Efrei API" });
});

// Middlewares
app.use(express.json());

// Routes
app.use("/student", studentRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);

app.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}/`);
});
