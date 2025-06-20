import axios from "axios";
import { OrderModel } from "../models/order.js";
import { addOrderValidator, updateOrderValidator } from "../validators/order.js";

export const addOrder = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = addOrderValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Write order to database
        const { firstName, lastName, phone, email, items, id } = await OrderModel.create({
            ...value,
            user: req.auth.id
        });
        // Generate hubtel payment invoice
        const total = parseFloat(items.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2));
        const hubtelResponse = await axios.post('https://payproxyapi.hubtel.com/items/initiate', {
            totalAmount: total,
            description: `Payment for GHC ${total} from ${firstName} ${lastName} to Dzidzeme Home Group`,
            callbackUrl: 'https://dzidzemeltd.onrender.com/orders/confirm',
            returnUrl: 'https://dzidzemeltd.vercel.app/hubtel-confirmation',
            merchantAccountNumber: process.env.HUBTEL_PAYMENT_MERCHANT_ACCOUNT_NUMBER,
            cancellationUrl: 'https://dzidzemeltd.vercel.app/hubtel-cancellation',
            clientReference: id,
            payeeName: `${firstName} ${lastName}`,
            payeeMobileNumber: phone,
            payeeEmail: email,
        }, {
            headers: {
                Authorization: `Basic ${btoa(`${process.env.HUBTEL_PAYMENT_API_ID}:${process.env.HUBTEL_PAYMENT_API_KEY}`)}`
            }
        });
        // Respond to request
        const order = await OrderModel.findByIdAndUpdate(id, {
            checkoutUrl: hubtelResponse.data.data.checkoutUrl,
        }, { new: true });
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
}

export const getOrders = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // Get total count of documents (BEFORE applying limit and skip)
        const totalCount = await OrderModel.countDocuments({});
        // Fetch orders from database
        const orders = await OrderModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Set X-Total-Count header
        res.set('X-Total-Count', totalCount);
        // Return response
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}

export const countOrders = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // Count orders in database
        const count = await OrderModel.countDocuments(JSON.parse(filter));
        // Respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
}

export const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Get order by id from database
        const order = await OrderModel
            .findById(id)
            .populate([
                { path: 'user', select: { name: true, email: true } },
                { path: 'items.product', select: { name: true, description: true } },
            ]);
        if (!order) {
            return res.status(404).json('Order not found!');
        }
        // Respond to request
        res.json(order);
    } catch (error) {
        next(error);
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = updateOrderValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Update order in database
        const { id } = req.params;
        const order = await OrderModel.findOneAndUpdate({ _id: id }, value, { new: true });
        // Respond to request
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Delete order by id from database
        await OrderModel.deleteOne({ _id: id });
        // Respond to request
        res.status(200).json("Order deleted!");
    } catch (error) {
        next(error);
    }
}

export const refreshOrderPaymentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Find order by id from database
        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json('Order not found!');
        }
        // Call Hubtel transaction status API
        const hubtelResponse = await axios.get(`https://api-txnstatus.hubtel.com/transactions/${process.env.HUBTEL_PAYMENT_MERCHANT_ACCOUNT_NUMBER}/status?clientReference=${id}`, {
            headers: {
                Authorization: `Basic ${btoa(`${process.env.HUBTEL_PAYMENT_API_ID}:${process.env.HUBTEL_PAYMENT_API_KEY}`)}`
            }
        });
        // Update order paymentStatus
        const { data: { status } } = hubtelResponse.data;
        console.log('Hubtel Transaction Status Check >>>', id, status);
        if (status === 'Paid') {
            await OrderModel.findByIdAndUpdate(id, { paymentStatus: 'PAYMENT_SUCCESSFUL' });
        }
        if (status === 'Unpaid') {
            await OrderModel.findByIdAndUpdate(id, { paymentStatus: 'PAYMENT_CANCELLED' });
        }
        // Respond to request
        res.status(200).json("Order status refreshed!");
    } catch (error) {
        next(error);
    }
}

export const confirmOrder = async (req, res, next) => {
    try {
        const { Data: { ClientReference, Status } } = req.body;
        console.log('Hubtel Payment Callback >>>', ClientReference, Status);
        // Update order by id from database
        if (Status === "Success") {
            await OrderModel.findByIdAndUpdate(ClientReference, { paymentStatus: 'PAYMENT_SUCCESSFUL' });
        }
        if (Status === 'Failed') {
            await OrderModel.findByIdAndUpdate(ClientReference, { paymentStatus: 'PAYMENT_CANCELLED' });
        }
        // Respond to request
        res.status(200).json("Order Confirmed!");
    } catch (error) {
        next(error);
    }
}