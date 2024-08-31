import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tour } from "./tour.entity";
import { User } from "./user.entity";

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookmarks, { nullable: false })
  user: User;

  @ManyToMany(() => Tour, tour => tour.bookmarks)
  @JoinTable({
    name: "bookmark_tours",
  })
  tours: Tour[];
}

// @JoinTable({
//     name: "bookmark_tours", // Name of the join table
//     joinColumn: {
//       name: "bookmark_id", // Name of the column in this table
//       referencedColumnName: "id", // Referencing the primary key of Bookmark
//     },
//     inverseJoinColumn: {
//       name: "tour_id", // Name of the column in the related table
//       referencedColumnName: "id", // Referencing the primary key of Tour
//     },
//   })
