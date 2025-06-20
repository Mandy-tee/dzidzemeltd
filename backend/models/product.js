import normalize from "normalize-mongoose";
import { Schema, Types, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Types.ObjectId, required: true, ref: 'Category' },
    isFeatured: { type: Boolean, default: false },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
}, {
    timestamps: true
});

productSchema.plugin(normalize);

export const ProductModel = model("Product", productSchema);