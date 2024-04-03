import { dbConnection, dbDisConnection } from './DB';
import { transformData } from './Controllers/transformer';
import { generateBrands } from './Controllers/Seeder';
import { exportData } from './Controllers/exporter';

(async () => {
  dbConnection();
  await transformData();
  await generateBrands();
  await exportData();
  dbDisConnection();
})();
