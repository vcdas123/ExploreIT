import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tour } from "./tour.entity";
import { User } from "./user.entity";

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour, tour => tour.bookmarks, { nullable: false })
  tour: Tour;

  @ManyToOne(() => User, user => user.bookmarks, { nullable: false })
  user: User;
}
