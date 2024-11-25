import express, { Request, Response, Application } from "express";
import userRoutes from "./routes/user";
import studentRoutes from "./routes/student";

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

app.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}/`);
});
