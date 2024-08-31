import { Column } from "typeorm";
import { IsAlpha } from "class-validator";

export class BaseLocation {
  @Column({ type: "varchar", length: 20 })
  longitude: string;

  @Column({ type: "varchar", length: 20 })
  latitude: string;

  @Column({ type: "varchar" })
  @IsAlpha()
  city: string;

  @Column({ type: "varchar" })
  @IsAlpha()
  state: string;

  @Column({ type: "varchar" })
  @IsAlpha()
  country: string;

  @Column({ type: "varchar" })
  postalCode: string;
}
