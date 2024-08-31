import { IsNotEmpty, IsString, Length } from "class-validator";
import { IsAlphaCheck } from "../validators/IsAlphaCheck";

export class LocationTypeDto {
  @IsString({ message: "Name (name) must be a string" })
  @IsAlphaCheck({
    message: "Name (name) must contain only alphabetic characters and spaces",
  })
  @Length(1, 20, {
    message: "Name (name) must be between 3 and 50 characters long",
  })
  @IsNotEmpty({ message: "Name (name) is required" })
  name: string;
}
