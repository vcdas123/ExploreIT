import {
  ArrayNotEmpty,
  IsAlpha,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { Transform } from "class-transformer";

export class SlotDto {
  @IsInt()
  @IsNotEmpty()
  tourId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  startDateAndTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  endDateAndTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  slotBookExpireDateAndTime: Date;

  @IsInt()
  @IsNotEmpty()
  totalDays: number;

  @IsInt()
  @IsNotEmpty()
  maxGroupSize: number;

  @IsString()
  @Length(1, 20)
  meetingLocationLongitude: string;

  @IsString()
  @Length(1, 20)
  meetingLocationLatitude: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationCity: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationState: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationCountry: string;

  @IsString()
  @IsNotEmpty()
  meetingLocationPostalCode: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  guides: number[];
}

const data = [
  {
    name: "Majestic Mountain Expedition",
    difficulty: "difficult",
    status: 1,
    price: 2500,
    priceDiscount: 500,
    summary:
      "An exhilarating journey through the world's most breathtaking mountain ranges.",
    description:
      "Join us on a challenging expedition that takes you through rugged terrains, stunning landscapes, and remote mountain villages. This tour is perfect for seasoned adventurers looking for a thrilling experience.",
    locations: [
      {
        name: "Himalayan Base Camp",
        description:
          "The starting point for our mountain adventure, offering stunning views of the surrounding peaks.",
        longitude: "86.9250",
        latitude: "27.9881",
        city: "Lukla",
        state: "Solukhumbu",
        country: "Nepal",
        postalCode: "56000",
        type: 1,
        images: [
          {
            image: "himalayan-base-camp-cover.jpg",
            imageType: "cover",
          },
          {
            image: "himalayan-base-camp-village.jpg",
            imageType: "others",
          },
        ],
      },
      {
        name: "Everest View Point",
        description:
          "A vantage point offering a panoramic view of Mount Everest and the surrounding peaks.",
        longitude: "86.8000",
        latitude: "27.9500",
        city: "Namche Bazaar",
        state: "Solukhumbu",
        country: "Nepal",
        postalCode: "56002",
        type: 1,
        images: [
          {
            image: "everest-view-point-cover.jpg",
            imageType: "cover",
          },
          {
            image: "everest-view-point-sunrise.jpg",
            imageType: "others",
          },
        ],
      },
    ],
    additionalImages: [
      {
        image: "mountain-expedition-group.jpg",
        imageType: "others",
      },
      {
        image: "mountain-expedition-summit.jpg",
        imageType: "cover",
      },
    ],
  },
  {
    name: "Tropical Island Getaway",
    difficulty: "easy",
    status: 1,
    price: 1200,
    priceDiscount: 150,
    summary:
      "Relax and rejuvenate with a peaceful escape to a beautiful tropical island.",
    description:
      "Experience the ultimate tropical vacation with pristine beaches, crystal-clear waters, and luxurious accommodations. Perfect for a relaxing getaway with family or friends.",
    locations: [
      {
        name: "Sunset Beach",
        description:
          "A picturesque beach known for its stunning sunsets and clear blue waters.",
        longitude: "123.4567",
        latitude: "-12.3456",
        city: "Tropicalville",
        state: "Beach State",
        country: "Tropical Island",
        postalCode: "78901",
        type: 2,
        images: [
          {
            image: "sunset-beach-cover.jpg",
            imageType: "cover",
          },
          {
            image: "sunset-beach-sunset.jpg",
            imageType: "others",
          },
        ],
      },
      {
        name: "Coral Reef Snorkeling",
        description:
          "An exciting snorkeling adventure at a vibrant coral reef teeming with marine life.",
        longitude: "123.6789",
        latitude: "-12.4567",
        city: "Tropicalville",
        state: "Beach State",
        country: "Tropical Island",
        postalCode: "78902",
        type: 2,
        images: [
          {
            image: "coral-reef-cover.jpg",
            imageType: "cover",
          },
          {
            image: "coral-reef-snorkeling.jpg",
            imageType: "others",
          },
        ],
      },
    ],
    additionalImages: [
      {
        image: "tropical-island-resort.jpg",
        imageType: "cover",
      },
      {
        image: "tropical-island-beach.jpg",
        imageType: "others",
      },
    ],
  },
];
