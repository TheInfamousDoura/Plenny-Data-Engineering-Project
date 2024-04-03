import { faker } from "@faker-js/faker";
import ExcelJS from "exceljs";
import { Brand } from "../Models/brands-schema";

export const generateBrands = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Brands");

    worksheet.columns = [
      { header: "Brand Name", key: "brandName" },
      { header: "Year Founded", key: "yearFounded" },
      { header: "Headquarters", key: "headquarters" },
      { header: "Number of Locations", key: "numberOfLocations" },
    ];

    for (let i = 1; i <= 10; i++) {
      const brand = new Brand({
        brandName: faker.company.buzzAdjective(),
        yearFounded: faker.number.int({
          min: 1600,
          max: new Date().getFullYear(),
        }),
        headquarters: faker.location.city(),
        numberOfLocations: faker.number.int({ min: 1, max: 100 }),
      });
      await brand.save();

      worksheet.addRow({
        brandName: brand.brandName,
        yearFounded: brand.yearFounded,
        headquarters: brand.headquarters,
        numberOfLocations: brand.numberOfLocations,
      });
    }

    await workbook.xlsx.writeFile("brand_seed_data.xlsx");
    console.log("Excel file created: brand_seed_data.xlsx");
  } catch (error) {
    console.error("Error generating brands:", (error as Error).message);
  }
};
