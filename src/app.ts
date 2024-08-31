import "reflect-metadata";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createTour } from "./controlllers/tour/tour.controller";
import TourRouter from "./routes/tourRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send(
    "This is a backend application for serving content related to tour."
  );
});
app.post("/test", createTour);
app.use("/api/v1/tours", TourRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: false,
    message: `The requested route ${req.originalUrl} is not found on the server!`,
  });
});

export default app;
