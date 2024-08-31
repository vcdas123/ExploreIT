import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";

@Entity()
export class ReviewImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  image: string;

  // Relations
  @ManyToOne(() => Review, review => review.images, { nullable: false })
  review: Review;
}
