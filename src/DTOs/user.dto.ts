import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsDate,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";

type Role = "user" | "admin" | "guide";

export class UserDto {
  @IsString()
  @MaxLength(255)
  userName: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsString()
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsUrl()
  profilePhoto: string;

  @IsEnum(["user", "admin", "guide"])
  @IsOptional()
  role?: Role = "user";
}
