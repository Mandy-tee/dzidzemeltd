import normalize from "normalize-mongoose";
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
});

categorySchema.plugin(normalize);

export const CategoryModel = model("Category", categorySchema);