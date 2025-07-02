import normalize from "normalize-mongoose";
import { Schema, model } from "mongoose";

const hubtelLogSchema = new Schema({
    ResponseCode: { type: String, required: true },
    Status: { type: String, required: true },
    Data: {
        CheckoutId: { type: String, required: true },
        SalesInvoiceId: { type: String, required: true },
        ClientReference: { type: String, required: true },
        Status: { type: String, required: true },
        Amount: { type: Number, required: true },
        CustomerPhoneNumber: { type: String, required: true },
        PaymentDetails: {
            MobileMoneyNumber: { type: String, required: true },
            PaymentType: { type: String, required: true },
            Channel: { type: String, required: true },
        },
        Description: { type: String, required: true },
    },
}, {
    timestamps: true
});

hubtelLogSchema.plugin(normalize);

export const HubtelLogModel = model("HubtelLog", hubtelLogSchema);