import express from "express";
import { createTour, getAllTours } from "../controlllers/tourController";

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);

export default router;
