import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
} from "class-validator";
import { Type } from "class-transformer";
import { IsValidImage } from "../validators/IsValidImage";

type ImgType = "cover" | "others";

export class LocationImageDto {
  @IsNotEmpty()
  // @IsValidImage()
  @IsString()
  image: string;

  @IsEnum(["cover", "others"])
  @IsNotEmpty()
  imageType: ImgType;
}
