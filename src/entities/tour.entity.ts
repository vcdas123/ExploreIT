import { IsOptional, Length, Matches, Min } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Slot } from "./slot.entity";
import { Location } from "./location.entity";
import { TourImage } from "./tourImage.entity";
import { Review } from "./review.entity";
import { Bookmark } from "./bookmark.entity";
import { IsLessThan } from "../validators/IsLessThan";

export type Difficulty = "easy" | "medium" | "difficult";
export type Status = 0 | 1 | 2; // 0 - delete | 1 - active | 2 - inactive

@Entity()
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  @Matches(/^[a-zA-Z0-9]+(?:[\s-][a-zA-Z0-9]+)*$/, {
    message:
      "Name (name) can only contain alphanumeric characters, spaces, and hyphens, and must not start or end with non-alphanumeric characters.",
  })
  @Length(10, 50)
  name: string;

  @Column({ type: "text" })
  slug: string;

  @Column({ type: "enum", enum: ["easy", "medium", "difficult"] })
  difficulty: Difficulty;

  @Column({ type: "enum", enum: [0, 1, 2], default: 1 })
  status: Status;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  @Min(1, { message: "Tour price cannot be less than one." })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @IsLessThan("price", {
    message: "Price discount must be less than the price.",
  })
  priceDiscount: number;

  @Column({ type: "text" })
  summary: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Slot, slot => slot.tour, {
    nullable: false,
    cascade: true,
  })
  @IsOptional()
  slots: Slot[];

  @OneToMany(() => Location, location => location.tour, {
    nullable: false,
    cascade: true,
  })
  locations: Location[];

  @OneToMany(() => TourImage, location => location.tour, {
    nullable: false,
    cascade: true,
  })
  additionalImages: TourImage[];

  @OneToMany(() => Review, review => review.tour, {
    cascade: true,
  })
  @IsOptional()
  reviews: Review[];

  @ManyToMany(() => Bookmark, bookmark => bookmark.tours)
  bookmarks: Bookmark[];
}
