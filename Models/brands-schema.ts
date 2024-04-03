import { Schema, model, Types } from "mongoose";

// Model Interface
export interface IBrand {
  _id?: Types.ObjectId;
  brandName: string;
  yearFounded: number;
  headquarters: string;
  numberOfLocations: number;
}
// build schema
const brandSchema = new Schema<IBrand>(
  {
    brandName: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },
    yearFounded: {
      type: Number,
      required: [true, "Year founded is required"],
      min: [1600, "Year founded seems too old"],
      max: [new Date().getFullYear(), "Year founded cannot be in the future"],
    },
    headquarters: {
      type: String,
      required: [true, "Headquarters location is required"],
      trim: true,
    },
    numberOfLocations: {
      type: Number,
      required: [true, "Number of locations is required"],
      min: [1, "There should be at least one location"],
    },
  },
  {
    timestamps: true,
  }
);

// create model and expot
// export const Brand = model("Brand", brandSchema);
export const Brand = model<IBrand>("Brand", brandSchema);

// module.exports = Brand;
