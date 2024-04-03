import { Brand, IBrand } from "../Models/brands-schema";

interface IBrandExtended extends IBrand {
  hqAddress?: string;
  yearCreated?: number | string;
  yearsFounded?: number | string;
  brand?: { name?: string };
}

export const transformData = async () => {
  const brands: IBrandExtended[] = await Brand.find().lean();

  for (const item of brands) {
    if (item.yearCreated) {
      item.yearFounded =
        typeof item.yearCreated === "number"
          ? item.yearCreated
          : parseInt(item.yearCreated);
    }
    if (item.yearsFounded) {
      item.yearFounded =
        typeof item.yearsFounded === "number"
          ? item.yearsFounded
          : parseInt(item.yearsFounded);
    }
    if (item.hqAddress) {
      item.headquarters = item.hqAddress;
    }
    if (item.brand && item.brand.name) {
      item.brandName = item.brand.name;
    }

    let yearFounded = item.yearFounded;
    if (!yearFounded || isNaN(yearFounded)) {
      yearFounded = item.yearFounded || item.yearFounded;
      yearFounded = isNaN(yearFounded) ? 1600 : Number(yearFounded);
    }

    let numberOfLocations = item.numberOfLocations;
    if (!numberOfLocations || isNaN(numberOfLocations)) {
      numberOfLocations = 1;
    }

    if (yearFounded > new Date().getFullYear()) {
      yearFounded = new Date().getFullYear();
    }

    const transformedData = <IBrand>{
      _id: item._id,
      brandName: item.brandName,
      yearFounded: yearFounded,
      headquarters: item.headquarters,
      numberOfLocations: numberOfLocations,
    };

    await Brand.replaceOne({ _id: item._id }, transformedData);
  }
};
