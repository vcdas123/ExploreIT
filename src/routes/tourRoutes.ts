import express from "express";
import { createTour, getAllTours } from "../controlllers/tour/tour.controller";

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);

export default router;
