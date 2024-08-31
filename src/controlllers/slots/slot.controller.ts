import { plainToInstance } from "class-transformer";
import { NextFunction } from "express";
import { SlotDto } from "../../DTOs/slot.dto";
import { validateOrReject } from "class-validator";
import { AppDataSource } from "../../appDataSource";
import { Slot } from "../../entities/slot.entity";

export const createSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {}
};

export const updateSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tourDto = plainToInstance(SlotDto, req.body);

    // Validate the instance against the DTO class
    await validateOrReject(tourDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const slotRepo = AppDataSource.getRepository(Slot);
  } catch (error) {}
};
