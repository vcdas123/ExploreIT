import { plainToInstance } from "class-transformer";
import { NextFunction } from "express";
import { validateOrReject } from "class-validator";
import { AppDataSource } from "../../appDataSource";
import { UserDto } from "../../DTOs/user.dto";
import { User } from "../../entities/user.entity";

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
    const userDto = plainToInstance(UserDto, req.body);

    await validateOrReject(userDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const userRepo = AppDataSource.getRepository(User);
  } catch (error) {}
};
