import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import slugify from "slugify";
import { TourDto } from "../DTOs/tour.dto";
import { isArray, validateOrReject, ValidationError } from "class-validator";
import { AppDataSource } from "../appDataSource";
import { Tour } from "../entities/tour.entity";
import { TourImage } from "../entities/tourImage.entity";
import { LocationImage } from "../entities/locationImage.entity";
import { Location } from "../entities/location.entity";
import { LocationType } from "../entities/locationType.entity";
import { formatValidationErrors } from "../utilities/errors/ErrorFormatter";

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
    const locationTypeRepo = AppDataSource.getRepository(LocationType);

    const createAdditionalImages = (images: any[]) => {
      return images?.map(item => {
        const tourImage = new TourImage();
        tourImage.image = item.image;
        tourImage.imageType = item.imageType;
        return tourImage;
      });
    };

    const createLocationImages = (images: any[]) => {
      return images?.map(item => {
        const locationImage = new LocationImage();
        locationImage.image = item.image;
        locationImage.imageType = item.imageType;
        return locationImage;
      });
    };

    const createLocations = async (locations: any[]) => {
      return await Promise.all(
        locations?.map(async item => {
          const location = new Location();
          location.name = item.name;
          location.description = item.description;
          location.longitude = item.longitude;
          location.latitude = item.latitude;
          location.city = item.city;
          location.state = item.state;
          location.country = item.country;
          location.postalCode = item.postalCode;
          location.images = createLocationImages(item.images);

          const locationType = await locationTypeRepo.findOneBy({
            id: item.typeId,
          });
          if (!locationType) {
            throw new Error(`LocationType with ID ${item.typeId} not found`);
          }

          location.type = locationType;
          return location;
        })
      );
    };

    const tour = new Tour();
    tour.name = req.body.name;
    tour.difficulty = req.body.difficulty;
    tour.status = 1;
    tour.slug = slugify(req.body.name, {
      trim: true,
      replacement: "-",
      lower: true,
    });
    tour.price = req.body.price;
    tour.priceDiscount = req.body.priceDiscount;
    tour.summary = req.body.summary;
    tour.description = req.body.description;
    tour.additionalImages = createAdditionalImages(req.body.additionalImages);
    tour.locations = await createLocations(req.body.locations);

    await tourRepo.save(tour);

    res.status(201).json({
      status: true,
      message: "Tour created successfully",
      data: {
        tour,
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
      ],
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

// hasd
