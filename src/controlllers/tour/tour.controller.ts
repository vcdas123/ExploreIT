import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { TourDto } from "../../DTOs/tour.dto";
import { isArray, validateOrReject, ValidationError } from "class-validator";
import { AppDataSource } from "../../appDataSource";
import { Status, Tour } from "../../entities/tour.entity";
import { formatValidationErrors } from "../../utilities/errors/ErrorFormatter";
import {
  attachAdditionalImages,
  attachLocations,
  attachSlots,
} from "./helpers/helpers";
import { createSlug } from "../../utilities/slugify/slugify";

export const createTour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Transform the request body into an instance of the DTO class
    const tourDto = plainToInstance(TourDto, req.body);

    // Validate the instance against the DTO class
    await validateOrReject(tourDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const tourRepo = AppDataSource.getRepository(Tour);

    const tour = new Tour();
    tour.name = req.body.name;
    tour.difficulty = req.body.difficulty;
    tour.status = Status.ACTIVE;
    tour.slug = createSlug(req.body.name);
    tour.price = req.body.price;
    tour.priceDiscount = req.body.priceDiscount;
    tour.summary = req.body.summary;
    tour.description = req.body.description;
    tour.additionalImages = attachAdditionalImages(req.body.additionalImages);
    tour.locations = await attachLocations(req.body.locations);
    // tour.slots = await attachSlots(req.body.slots);

    await tourRepo.save(tour);

    res.status(201).json({
      status: true,
      message: "Tour created successfully",
      data: {
        tour,
      },
    });
  } catch (errors) {
    console.log(errors);

    const validationErrors = errors as ValidationError[];

    return res.status(400).json({
      status: false,
      message: "Validation failed",
      errors: isArray(errors)
        ? formatValidationErrors(validationErrors)
        : errors,
    });
  }
};

export const getAllTours = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tourRepo = AppDataSource.getRepository(Tour);

    const tours = await tourRepo.find({
      relations: [
        "additionalImages",
        "locations",
        "locations.images",
        "locations.type",
        "slots",
        "slots.guides",
      ],
      where: {
        status: Status.ACTIVE,
      },
    });

    res.status(201).json({
      status: true,
      message: "Tour fetched successfully",
      data: {
        tours,
      },
    });
  } catch (errors) {
    const validationErrors = errors as ValidationError[];

    return res.status(400).json({
      status: false,
      message: "Validation failed",
      errors: isArray(errors)
        ? formatValidationErrors(validationErrors)
        : errors,
    });
  }
};
