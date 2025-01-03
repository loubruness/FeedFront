import express, { Application, Request, Response } from "express";

import cors from 'cors';
import courseRoutes from "./routes/course";
import studentRoutes from "./routes/student";
import userRoutes from "./routes/user";

const application: Application = express();
const port = 8000;

// CORS
application.use(cors({
  origin: '*', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Middlewares
application.use(express.json());

// Default route
application.get("/", (request: Request, response: Response) => {
  response.json({ name: "Mock Efrei API" });
});

// Routes
application.use("/user", userRoutes);
application.use("/student", studentRoutes);
application.use("/course", courseRoutes);

application.listen(port, () => {
  console.log(`Server started and running on http://localhost:${port}/`);
});
