import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tour } from "./tour.entity";
import { IsValidImage } from "../validators/IsValidImage";

export type ImgType = "cover" | "others";

@Entity()
export class TourImage {
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
  @ManyToOne(() => Tour, tour => tour.additionalImages, { nullable: false })
  tour: Tour;
}
