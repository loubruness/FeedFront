import express, { Application, Request, Response } from "express";
import userRoutes from "./routes/user";
import studentRoutes from "./routes/student";
import courseRoutes from "./routes/course";

const application: Application = express();
const port = 8000;

// Default route
application.get("/", (request: Request, response: Response) => {
  response.json({ name: "Mock Efrei API" });
});

// Middlewares
application.use(express.json());

// Routes
application.use("/user", userRoutes);
application.use("/student", studentRoutes);
application.use("/course", courseRoutes);

application.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}/`);
});
