import express, { Request, Response, Application } from "express";
import userRoutes from "./routes/user";

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

application.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}/`);
});
