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
import { BaseLocation } from "./baseClasses/BaseLocation";

export enum Status {
  DELETED = "0",
  ACTIVE = "1",
  INACTIVE = "2",
}

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  status: Status;

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
  meetingLocation: BaseLocation;

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
