import normalize from "normalize-mongoose";
import { Schema, model } from "mongoose";


const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: {type: String, required: true}
}, {
    timestamps: true
});

productSchema.plugin(normalize);

export const ProductModel = model("Product", productSchema);