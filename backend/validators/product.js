import Joi from "joi";

export const addProductValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
});

export const updateProductValidator = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
    image: Joi.string()
});