import fs  from 'fs';
import { Brand, IBrand } from "../Models/brands-schema";




export const exportData = async ()=>{
    const brands:IBrand[]  = await Brand.find();
    const jsonData = JSON.stringify(brands, null, 2);
    const filePath = 'new_brands.json';
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
          console.error('Error writing JSON file:', err.message);
        } else {
          console.log(`Data exported to ${filePath}`);
        }
      });
}


