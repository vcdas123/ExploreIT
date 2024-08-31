import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LocationType } from "./locationType.entity";
import { Tour } from "./tour.entity";
import { LocationImage } from "./locationImage.entity";
import { IsAlpha, Length } from "class-validator";
import { IsAlphaCheck } from "../validators/IsAlphaCheck";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(3, 100, {
    message: "Name (name) must be between 3 and 100 characters long",
  })
  @IsAlphaCheck({
    message: "Name (name) must contain only alphabetic characters and spaces",
  })
  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 20 })
  longitude: string;

  @Column({ type: "varchar", length: 20 })
  latitude: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar" })
  state: string;

  @Column({ type: "varchar" })
  country: string;

  @Column({ type: "varchar" })
  postalCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => LocationType, locationType => locationType.locations, {
    nullable: false,
  })
  type: LocationType;

  @ManyToOne(() => Tour, tour => tour.locations, { nullable: false })
  tour: Tour;

  @OneToMany(() => LocationImage, locationImage => locationImage.location, {
    nullable: false,
    cascade: true,
  })
  images: LocationImage[];
}
