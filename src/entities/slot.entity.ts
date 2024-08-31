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
import { BaseLocation } from "./baseClasses/BaseLocation";

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

  @Column(() => BaseLocation)
  meetingLoc: BaseLocation;

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
