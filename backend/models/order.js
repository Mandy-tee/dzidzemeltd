import normalize from "normalize-mongoose";
import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    user: { type: Types.ObjectId, required: true, ref: 'User' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    checkoutUrl: { type: String, default: null },
    deliveryStatus: { type: String, default: 'PENDING', enum: ['PENDING', 'PROCESSING', 'COMPLETED'] },
    paymentStatus: { type: String, default: 'PAYMENT_PENDING', enum: ['PAYMENT_PENDING', 'PAYMENT_SUCCESSFUL', 'PAYMENT_CANCELLED'] },
    items: [{
        product: { type: Types.ObjectId, required: true, ref: 'Product' },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        _id: false,
    }]
}, {
    timestamps: true
});

orderSchema.plugin(normalize);

export const OrderModel = model("Order", orderSchema);