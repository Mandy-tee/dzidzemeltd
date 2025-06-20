import Joi from "joi";

export const addOrderValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
    })).min(1),
});

export const updateOrderValidator = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    region: Joi.string(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
    })).min(1),
});