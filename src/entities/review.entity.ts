import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReviewImage } from "./reviewImage.entity";
import { Tour } from "./tour.entity";
import { User } from "./user.entity";
import { IsPositive, Max, Min } from "class-validator";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "tinyint" })
  @Min(1, { message: "Rating cannot be less than one." })
  @Max(5, { message: "Rating cannot exceed five." })
  rating: number;

  @IsPositive()
  @Column({ type: "int", default: 0 })
  likes: number;

  @IsPositive()
  @Column({ type: "int", default: 0 })
  dislikes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => ReviewImage, reviewImage => reviewImage.review, {
    nullable: false,
    cascade: true,
  })
  images: ReviewImage[];

  @ManyToOne(() => Tour, tour => tour.reviews, { nullable: false })
  tour: Tour;

  @ManyToOne(() => User, user => user.reviews, { nullable: false })
  user: User;
}

// later review replies will be added
