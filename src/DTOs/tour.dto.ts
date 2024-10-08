import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  ValidateNested,
} from "class-validator";
import { IsLessThan } from "../validators/IsLessThan";
import { Type } from "class-transformer";
import { LocationDto } from "./location.dto";
import { SlotDto } from "./slot.dto";
import { TourImageDto } from "./tourImage.dto";
import { Status } from "../entities/tour.entity";

enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  DIFFICULT = "difficult",
}

export class TourDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9]+(?:[\s-][a-zA-Z0-9]+)*$/)
  @Length(10, 50)
  name: string;

  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsNumber()
  @Min(1)
  price: number;

  @IsLessThan("price")
  @Min(0)
  @IsNumber()
  @IsOptional()
  priceDiscount: number;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  @IsNotEmpty()
  locations: LocationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotDto)
  @IsOptional()
  slots: SlotDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourImageDto)
  @IsNotEmpty()
  additionalImages: TourImageDto[];
}
