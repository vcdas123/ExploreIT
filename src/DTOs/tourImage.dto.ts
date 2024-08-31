import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ImgType } from "../entities/tourImage.entity";
import { IsValidImage } from "../validators/IsValidImage";

export class TourImageDto {
  // @IsValidImage()
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsEnum(["cover", "others"])
  @IsNotEmpty()
  imageType: ImgType;
}
