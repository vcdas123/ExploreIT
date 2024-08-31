import { AppDataSource } from "../../../appDataSource";
import { Location } from "../../../entities/location.entity";
import { LocationImage } from "../../../entities/locationImage.entity";
import { LocationType } from "../../../entities/locationType.entity";
import { TourImage } from "../../../entities/tourImage.entity";

export const attachAdditionalImages = (images: any[]) => {
  return images?.map(item => {
    const tourImage = new TourImage();
    tourImage.image = item.image;
    tourImage.imageType = item.imageType;
    return tourImage;
  });
};

export const attachLocations = async (locations: any[]) => {
  const locationTypeRepo = AppDataSource.getRepository(LocationType);

  const attachLocationsImages = (images: any[]) => {
    return images?.map(item => {
      const locationImage = new LocationImage();
      locationImage.image = item.image;
      locationImage.imageType = item.imageType;
      return locationImage;
    });
  };

  const loc = async () => {
    return await Promise.all(
      locations?.map(async item => {
        const loc = new Location();
        loc.name = item.name;
        loc.description = item.description;
        loc.location.longitude = item.longitude;
        loc.location.latitude = item.latitude;
        loc.location.city = item.city;
        loc.location.state = item.state;
        loc.location.country = item.country;
        loc.location.postalCode = item.postalCode;
        loc.images = attachLocationsImages(item.images);

        const locType = await locationTypeRepo.findOneBy({
          id: item.typeId,
        });
        if (!locType) {
          throw new Error(`LocationType with ID ${item.typeId} not found`);
        }

        loc.type = locType;
        return loc;
      })
    );
  };

  return loc();
};

export const attachSlots = async (slots: any[]) => {};
