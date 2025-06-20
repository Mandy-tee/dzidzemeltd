import Joi from "joi";

export const addProductValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    isFeatured: Joi.boolean(),
    image: Joi.string().required(),
    stock: Joi.number(),
});

export const updateProductValidator = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    description: Joi.string(),
    category: Joi.string(),
    isFeatured: Joi.boolean(),
    image: Joi.string(),
    stock: Joi.number(),
});