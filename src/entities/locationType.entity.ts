import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity";
import { Length } from "class-validator";

@Entity()
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(1, 20, {
    message: "Name (name) must be between 3 and 50 characters long",
  })
  @Column({ type: "varchar", length: 50 })
  name: string;

  @OneToMany(() => Location, location => location.type, {
    nullable: false,
  })
  locations: Location[];
}
