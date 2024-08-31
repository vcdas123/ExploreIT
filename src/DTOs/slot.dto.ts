import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Transform } from "class-transformer";

enum Status {
  DELETE = 0,
  ACTIVE = 1,
  INACTIVE = 2,
}

export class SlotDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  startDateAndTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  endDateAndTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  slotBookExpireDateAndTime: Date;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsInt()
  @IsNotEmpty()
  totalDays: number;

  @IsInt()
  @IsNotEmpty()
  maxGroupSize: number;

  @IsString()
  @Length(1, 20)
  meetingLocationLongitude: string;

  @IsString()
  @Length(1, 20)
  meetingLocationLatitude: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationCity: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationState: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationCountry: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationPostalCode: string;
}
