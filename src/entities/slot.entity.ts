import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tour } from "./tour.entity";
import { User } from "./user.entity";
import { IsAlpha } from "class-validator";
import { IsAlphaCheck } from "../validators/IsAlphaCheck";

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  startDateAndTime: Date;

  @Column({ type: "timestamp" })
  endDateAndTime: Date;

  @Column({ type: "timestamp" })
  slotBookExpireDateAndTime: Date;

  @Column({ type: "int" })
  totalDays: number;

  @Column({ type: "int" })
  maxGroupSize: number;

  @Column({ type: "varchar", length: 20 })
  meetingLocationLongitude: string;

  @Column({ type: "varchar", length: 20 })
  meetingLocationLatitude: string;

  @Column({ type: "varchar" })
  @IsAlphaCheck({
    message:
      "Meeting location city (meetingLocationCity) must contain only alphabetic characters and spaces",
  })
  meetingLocationCity: string;

  @Column({ type: "varchar" })
  @IsAlphaCheck({
    message:
      "Meeting location state (meetingLocationState) must contain only alphabetic characters and spaces",
  })
  meetingLocationState: string;

  @Column({ type: "varchar" })
  @IsAlphaCheck({
    message:
      "Meeting location country (meetingLocationCountry) must contain only alphabetic characters and spaces",
  })
  meetingLocationCountry: string;

  @Column({ type: "varchar" })
  meetingLocationPostalCode: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Tour, tour => tour.slots, { nullable: false })
  tour: Tour;

  @ManyToMany(() => User, user => user.slots, {
    nullable: false,
    cascade: true,
  })
  @JoinTable({
    name: "slotguides",
  })
  guides: User[];
}
