import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity";
import { IsValidImage } from "../validators/IsValidImage";

type ImgType = "cover" | "others";

@Entity()
export class LocationImage {
  @PrimaryGeneratedColumn()
  id: number;

  @IsValidImage({
    message:
      "Image (image) must be a valid URL ending with .jpg, .jpeg, or .png",
  })
  @Column({ type: "text" })
  image: string;

  @Column({ type: "enum", enum: ["cover", "others"], default: "others" })
  imageType: ImgType;

  // Relations
  @ManyToOne(() => Location, location => location.images, { nullable: false })
  location: Location;
}
