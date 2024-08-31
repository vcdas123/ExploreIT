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
import { Review } from "./review.entity";
import { Bookmark } from "./bookmark.entity";
import { MinLength } from "class-validator";

type Role = "user" | "admin" | "guide";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  userName: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @MinLength(6)
  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255 })
  firstName: string;

  @Column({ type: "varchar", length: 255 })
  lastName: string;

  @Column({ type: "timestamp" })
  dob: Date;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "enum", enum: ["user", "admin", "guide"], default: "user" })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToMany(() => Slot, slot => slot.guides)
  slots: Slot[];

  @OneToMany(() => Review, review => review.tour)
  reviews: Review[];

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];
}
